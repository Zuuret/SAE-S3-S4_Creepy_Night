<template>
  <div class="reservations-container">
    <h2>{{ $t('my_reservations') }}</h2>
    <div v-if="reservationsId && reservationsId.length > 0" class="reservations-list">
      <div v-for="reservation in reservationsId" :key="reservation.id_reservation" class="reservation-item">
        <div class="reservation-header">
          <p><strong>{{ $t('reservation') }} #{{ reservation.id_reservation }}</strong></p>
        <div class="concert-details">
          <h3>{{ $t('reserved_concert_details') }} :</h3>
          <ul>
            <li v-for="concert in reservation.concerts" :key="concert.concert.id" class="concert-item">
              <div class="concert-info">
                <p><strong>{{ concert.concert.artiste }}</strong> - {{ concert.concert.categorie }} </p>
                <p>{{ $t('date') }} : {{ concert.concert.date }} {{ $t('at') }} {{ concert.concert.heure }}</p>
                <p>{{ $t('number_of_seats') }} : {{ concert.nbPlaces }}</p>
                <p>{{ $t('seat_type') }} : {{ concert.place.type_place }}</p>
                <p>{{ $t('price_per_seat') }} : {{ concert.place.prix_place }} €</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <!-- Contenu pour les utilisateurs ayant accès -->
      <h1>{{ $t('welcome') }} {{ utilisateurConnecte?.societe }}</h1>
      <!-- Autres contenus -->
    </div>
    <p v-else class="error">{{ $t('accessDenied') }}</p>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ReservationConcerts",
  computed: {
    ...mapState('ConcertStore', ['utilisateurConnecte', 'reservationsId']),
  },
  methods: {
    ...mapActions('ConcertStore', ['getReservationConcertById']),
  },
  mounted() {
    if (this.utilisateurConnecte && this.utilisateurConnecte.id) {
      this.getReservationConcertById(this.utilisateurConnecte.id);
    }
  }
}
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
