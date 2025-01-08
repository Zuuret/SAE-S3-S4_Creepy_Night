<template>
  <div>
    <h2>Mes réservations</h2>
    <div v-if="reservationsId && reservationsId.length > 0">
      <div v-for="reservation in reservationsId" :key="reservation.id">
        <p><strong>Réservation #{{ reservation.id }}</strong></p>
        <p>Date: {{ reservation.date }}</p>
        <p>Total: {{ reservation.total }} €</p>
        <div>
          <h3>Détails des concerts réservés :</h3>
          <ul>
            <li v-for="concert in reservation.concerts" :key="concert.concertId">
              Concert : {{ concert.concert }} <br />
              Nombre de places : {{ concert.nbPlaces }} <br />
              Place : {{ concert.place }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Aucune réservation trouvée.</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ReservationActivites",
  computed: {
    ...mapState('ConcertStore', ['utilisateurConnecte', 'reservationsId'])
  },
  methods: {
    ...mapActions('ConcertStore', ['getReservationConcertById'])
  },
  mounted() {
    this.getReservationConcertById(this.utilisateurConnecte.id);
  }
}
</script>

<style scoped>
/* Ajoutez du style selon vos préférences */
</style>
