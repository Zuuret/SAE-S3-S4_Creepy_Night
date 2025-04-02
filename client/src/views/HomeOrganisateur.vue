<template>
  <div class="home-organisateur">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="main-content">
      <header>
        <h1>Bienvenue sur la page de l'organisateur</h1>
      </header>
      <section class="daily-stats">
        <h2>Chiffres du jour</h2>
        <div class="stat-item">
          <span class="stat-title">Places vendues aujourd'hui :</span>
          <span class="stat-value">{{ billetsAchatAujourdHui }}</span>
        </div>
      </section>

      <section class="stats-chart">
        <h2>Évolution des ventes cette semaine</h2>
        <div class="chart-container">
          <template v-if="loading">
            <div class="loading-message">Chargement des données...</div>
          </template>
          <template v-else-if="error">
            <div class="error-message">{{ error }}</div>
          </template>
          <template v-else-if="!chartData || chartData.data.length === 0">
            <div class="no-data-message">Aucune donnée de vente disponible pour cette semaine</div>
          </template>
          <template v-else>
            <div class="chart-wrapper" v-if="chartData && chartData.labels.length === 7">
              <canvas 
                ref="ventesChart"
                key="ventesChart"
                v-if="chartData && chartData.labels.length === 7"
                style="width: 100%; height: 100%; display: block;"
              ></canvas>
              <div v-else class="no-data-message">
                {{ chartData ? `Données incomplètes (${chartData.labels.length}/7 jours)` : 'Chargement...' }}
              </div>
            </div>
          </template>
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
      error: null,
      windowWidth: window.innerWidth,
      refreshInterval: null,
      dateCheckInterval: null
    };
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapState("organisateur", ["billetsAchatAujourdHui", "historiqueVentes"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
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
        }).replace('.', '').replace(/\s+/g, ' '); // Format "mar 26 mars"
      });
      
      const data = this.historiqueVentes.map(item => item.count);

      console.log('Données formatées:', { labels, data });
      return { labels, data };
    }
  },
  methods: {
    ...mapActions("organisateur", ["fetchBilletsAchatAujourdhui", "fetchHistoriqueVentes"]),
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.chart) {
        this.chart.resize();
      }
    },
    async initChart() {
      // 1. Détruire l'ancien graphique
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      // 2. Attendre que les conditions soient remplies
      await this.$nextTick();
      
      if (!this.$refs.ventesChart) {
        console.error('ERREUR: Canvas non trouvé - nouvelle tentative dans 100ms');
        setTimeout(() => this.initChart(), 100);
        return;
      }

      // 3. Vérifier les données
      if (!this.chartData || this.chartData.labels.length !== 7) {
        console.error('Données incomplètes', this.chartData);
        return;
      }

      // 4. Initialiser le graphique
      const ctx = this.$refs.ventesChart.getContext('2d');
      if (!ctx) return;

      // Forcer les dimensions
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
      // Actualiser toutes les heures
      this.refreshInterval = setInterval(() => {
        this.fetchHistoriqueVentes();
      }, 3600000);

      // Vérifier le changement de jour toutes les minutes
      this.dateCheckInterval = setInterval(() => {
        const maintenant = new Date();
        if (maintenant.getDate() !== this.lastCheckDate) {
          this.fetchHistoriqueVentes();
        }
        this.lastCheckDate = maintenant.getDate();
      }, 60000);
    },
      scheduleMidnightRefresh() {
      const maintenant = new Date();
      const minuit = new Date();
      minuit.setHours(24, 0, 0, 0);
      const delai = minuit - maintenant;
      
      setTimeout(() => {
        this.fetchHistoriqueVentes();
        this.scheduleMidnightRefresh(); // Reprogrammer pour le prochain minuit
      }, delai);
    }
  },
  watch: {
    historiqueVentes: {
      async handler() {
        this.loading = false;
        await this.$nextTick();
        this.initChart();
      },
      immediate: true,
      deep: true
    },
    windowWidth() {
      this.initChart();
    }
  },
  async mounted() {
    window.addEventListener('resize', this.handleResize);
    this.setupAutoRefresh();
    
    if (!this.utilisateurConnecte) {
      console.log("Utilisateur non connecté, redirection vers /");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
      try {
        this.loading = true;
        await Promise.all([
          this.fetchBilletsAchatAujourdhui(),
          this.fetchHistoriqueVentes()
        ]);
      } catch (error) {
        this.error = "Erreur lors du chargement des données";
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
    this.setupAutoRefresh();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.chart) {
      this.chart.destroy();
    }
    clearInterval(this.refreshInterval);
    clearInterval(this.dateCheckInterval);
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