<template>
  <div class="reservations-container">
    <div class="navbar">
      <NavBar />
    </div>
    
    <h2>{{ $t('my_reservations') }}</h2>

    <!-- État de chargement -->
    <div v-if="loading" class="loading-message">
      <p>{{ $t('loading') }}...</p>
    </div>

    <!-- Utilisateur non connecté -->
    <div v-else-if="!utilisateurConnecte" class="error-message">
      <p>{{ $t('accessDenied') }}</p>
      <router-link to="/connexion" class="login-link">
        {{ $t('login_here') }}
      </router-link>
    </div>

    <!-- Liste des réservations -->
    <div v-else>
      <div v-if="reservations.length > 0" class="reservations-list">
        <div v-for="reservation in reservations" :key="reservation.id_reservation" class="reservation-card">
          <div class="reservation-header">
            <h3>{{ $t('reservation') }} #{{ reservation.id_reservation }}</h3>
            <p class="reservation-date">{{ formatDate(reservation.date_reservation) }}</p>
          </div>

          <div class="concert-details">
            <div v-for="(item, index) in reservation.concert_details" :key="index" class="concert-item">
              <h4>{{ item.artiste }}</h4>
              <div class="detail-row">
                <span class="detail-label">{{ $t('date') }}:</span>
                <span class="detail-value">{{ item.date }} {{ $t('at') }} {{ item.heure }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">{{ $t('scene') }}:</span>
                <span class="detail-value">{{ item.scene }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">{{ $t('quantity') }}:</span>
                <span class="detail-value">{{ item.quantite }}</span>
              </div>
              <div class="detail-row total">
                <span class="detail-label">{{ $t('total') }}:</span>
                <span class="detail-value">{{ item.total }} €</span>
              </div>
            </div>
          </div>

          <button 
            class="cancel-button"
            @click="annulerReservation(reservation.id_reservation)"
          >
            {{ $t('cancel_reservation') }}
          </button>
        </div>
      </div>

      <!-- Aucune réservation -->
      <div v-else class="no-reservations">
        <p>{{ $t('no_reservations') }}</p>
        <router-link to="/concerts" class="discover-link">
          {{ $t('discover_concerts') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ReservationConcerts",
  components: { NavBar },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState('ConcertStore', ['utilisateurConnecte', 'reservations']),
  },
  methods: {
    ...mapActions('ConcertStore', ['fetchUserReservations', 'cancelReservation']),
    
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },

    async annulerReservation(reservationId) {
      if (confirm(this.$t('confirm_cancel'))) {
        try {
          await this.cancelReservation(reservationId);
          await this.fetchUserReservations(this.utilisateurConnecte.id);
        } catch (error) {
          console.error("Erreur d'annulation:", error);
        }
      }
    }
  },
  async mounted() {
    if (this.utilisateurConnecte?.id) {
      await this.fetchUserReservations(this.utilisateurConnecte.id);
    }
    this.loading = false;
  }
};
</script>

<style scoped>
/* Conteneur global des réservations */
.reservations-container {
  margin: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

/* Style des éléments de la liste de réservations */
.reservations-list {
  margin-top: 20px;
}

.reservation-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.reservation-header {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.reservation-header p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.concert-details h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
}

.concert-item {
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 6px;
}

.concert-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.no-reservations {
  text-align: center;
  color: #888;
  font-size: 16px;
}

.no-reservations p {
  margin-top: 20px;
  font-style: italic;
}
</style>
