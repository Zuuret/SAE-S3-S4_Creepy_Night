<template>
  <div class="home-organisateur">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="main-content">
      <header>
        <h1>{{ $t('organisateur.welcome') }}</h1>
      </header>

      <section class="daily-stats">
        <h2>{{ $t('organisateur.dailyStatsTitle') }}</h2>
        <div class="stat-item">
          <span class="stat-title">{{ $t('organisateur.ticketsSoldToday') }}</span>
          <span class="stat-value">{{ billetsAchatAujourdHui }}</span>
        </div>
      </section>

      <section class="stats-chart">
        <h2>{{ $t('organisateur.weeklySalesTitle') }}</h2>
        <div class="chart-container">
          <template v-if="loading">
            <div class="loading-message">{{ $t('organisateur.loading') }}</div>
          </template>
          <template v-else-if="error">
            <div class="error-message">{{ error }}</div>
          </template>
          <template v-else-if="!chartData || chartData.data.length === 0">
            <div class="no-data-message">{{ $t('organisateur.noData') }}</div>
          </template>
          <template v-else>
            <div class="chart-wrapper" v-if="chartData && chartData.labels.length === 7">
              <canvas 
                ref="ventesChart"
                key="ventesChart"
                style="width: 100%; height: 100%; display: block;"
              ></canvas>
            </div>
          </template>
        </div>
      </section>

      <section class="stats-chart">
        <h2>Réservations par style musical</h2>
        <div class="chart-container">
          <canvas ref="stylesChart" style="width: 100%; height: 400px;"></canvas>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import NavOrganisateur from "@/components/NavOrganisateur.vue";
import Chart from 'chart.js/auto';

export default {
  name: "HomeOrganisateur",
  components: {
    NavOrganisateur
  },
  data() {
    return {
      chart: null,
      loading: true,
      loadingReservations: true,
      error: null,
      reservationsError: null,
      windowWidth: window.innerWidth,
      refreshInterval: null,
      dateCheckInterval: null
    };
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapGetters("ConcertStore", ["allReservations", "allConcerts"]),
    ...mapState("ConcertStore", ["concerts"]),
    ...mapState("organisateur", ["billetsAchatAujourdHui", "historiqueVentes"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
    stylesData() {
      // Compte le nombre de réservations par style
      const styleCounts = this.reservationsWithDetails.reduce((acc, reservation) => {
        const style = reservation.concertType;
        acc[style] = (acc[style] || 0) + reservation.nb_places;
        return acc;
      }, {});

      // Transforme en format adapté pour Chart.js
      return {
        labels: Object.keys(styleCounts),
        datasets: [{
          label: 'Nombre de places réservées',
          data: Object.values(styleCounts),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      };
    },
    reservations() {  // Ajoutez cette propriété
      return this.allReservations || [];
    },
    reservationsWithDetails() {
      return this.allReservations?.map(reservation => {
        // Utilisez concert_id au lieu de evenement_id
        const concert = this.concerts?.find(c => c.id === reservation.concert_id);
        console.log('Matching concert:', concert, 'for reservation:', reservation);
        
        return {
          ...reservation,
          concertType: concert?.categorie || 'Inconnu',
          artiste: concert?.artiste || 'Artiste inconnu',
          // Formatage de la date
          formattedDate: this.formatDate(reservation.date_reservation)
        };
      }) || [];
    },
    chartData() {
      if (!this.historiqueVentes || this.historiqueVentes.length !== 7) {
        return null;
      }

      const labels = this.historiqueVentes.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          day: 'numeric',
          month: 'short'
        }).replace('.', '').replace(/\s+/g, ' ');
      });
      
      const data = this.historiqueVentes.map(item => item.count);

      return { labels, data };
    }
  },
  methods: {
    ...mapActions("organisateur", ["fetchBilletsAchatAujourdhui", "fetchHistoriqueVentes"]),
    ...mapActions("ConcertStore", ["fetchReservations", "getAllConcert"]),
    
    formatDate(dateString) {
      if (!dateString) return 'Date inconnue';
      
      try {
        // Essayez d'abord de parser la date telle quelle
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          // Si échec, essayez avec Date.parse
          const parsed = Date.parse(dateString);
          if (isNaN(parsed)) {
            return 'Date invalide';
          }
          return new Date(parsed).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        console.error("Erreur de formatage de date:", e, dateString);
        return 'Date invalide';
      }
    },

    initStylesChart() {
      const ctx = this.$refs.stylesChart?.getContext('2d');
      if (!ctx) return;

      if (this.stylesChart) {
        this.stylesChart.destroy();
      }

      this.stylesChart = new Chart(ctx, {
        type: 'bar',
        data: this.stylesData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.dataset.label}: ${context.raw} places`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                stepSize: 1
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          barPercentage: 0.6, // Contrôle l'épaisseur des barres
          categoryPercentage: 0.8
        }
      });
    },

    shortUserId(userId) {
      return userId ? `${userId.substring(0, 8)}...` : 'N/A';
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.chart) {
        this.chart.resize();
      }
    },

    async initChart() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      await this.$nextTick();
      
      if (!this.$refs.ventesChart) {
        setTimeout(() => this.initChart(), 100);
        return;
      }

      if (!this.chartData || this.chartData.labels.length !== 7) {
        return;
      }

      const ctx = this.$refs.ventesChart.getContext('2d');
      if (!ctx) return;

      const canvas = this.$refs.ventesChart;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Billets vendus',
            data: this.chartData.data,
            borderColor: '#ff4757',
            backgroundColor: 'rgba(255, 71, 87, 0.1)',
            borderWidth: 3,
            tension: 0.3,
            pointBackgroundColor: '#ff4757',
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                stepSize: 1
              }
            }
          }
        }
      });
    },

    setupAutoRefresh() {
      this.refreshInterval = setInterval(() => {
        this.fetchHistoriqueVentes();
      }, 3600000);

      this.dateCheckInterval = setInterval(() => {
        const maintenant = new Date();
        if (maintenant.getDate() !== this.lastCheckDate) {
          this.fetchHistoriqueVentes();
        }
        this.lastCheckDate = maintenant.getDate();
      }, 60000);
    }
  },
  async mounted() {
    this.initStylesChart();
    window.addEventListener('resize', this.handleResize);
    
    if (!this.utilisateurConnecte) {
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé");
    } else {
      try {
        this.loading = true;
        this.loadingReservations = true;
        
        // Chargez d'abord les concerts
        await this.getAllConcert();
        console.log('Concerts chargés:', this.concerts);
        
        // Puis les réservations
        await this.fetchReservations();
        console.log('Réservations chargées:', this.allReservations);
        
        // Enfin les autres données
        await Promise.all([
          this.fetchBilletsAchatAujourdhui(),
          this.fetchHistoriqueVentes()
        ]);
        
      } catch (error) {
        console.error('Erreur de chargement:', error);
        this.error = "Erreur lors du chargement des données";
        this.reservationsError = "Erreur lors du chargement des réservations";
      } finally {
        this.loading = false;
        this.loadingReservations = false;
      }
    }
    this.setupAutoRefresh();
  },
  watch: {
    historiqueVentes: {
      async handler() {
        await this.$nextTick();
        this.initChart();
      },
      immediate: true
    },
    reservationsWithDetails: {
      handler() {
        this.$nextTick(() => {
          this.initStylesChart();
        });
      },
      deep: true
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    if (this.dateCheckInterval) clearInterval(this.dateCheckInterval);
    if (this.chart) this.chart.destroy();
    if (this.stylesChart) {
      this.stylesChart.destroy();
    }
  }
};
</script>

<style scoped>
.home-organisateur {
  display: flex;
  height: 100vh;
  background-color: #f4f5f7;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  padding-left: 300px;
}

header h1 {
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.daily-stats, .stats-chart {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.daily-stats h2, .stats-chart h2 {
  font-size: 1.8em;
  color: #2c3e50;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  color: #555;
}

.stat-title {
  font-weight: bold;
}

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}

.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.loading-message,
.error-message,
.no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #555;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: #ff4757;
}

.loading-message::after {
  content: "...";
  animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {
  0%, 20% { content: "."; }
  40% { content: ".."; }
  60%, 100% { content: "..."; }
}

.chart-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  min-height: 400px;
}

.no-data-message {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
</style>