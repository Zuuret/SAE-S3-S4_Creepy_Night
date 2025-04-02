<template>
  <div class="reservations-container">
    <h2>{{ $t('my_reservations') }}</h2>
    <div v-if="reservationsId && reservationsId.length > 0" class="reservations-list">
      <div v-for="reservation in reservationsId" :key="reservation.id_location" class="reservation-item">
        <div class="reservation-header">
          <p><strong>{{ $t('reservation_number') }} #{{ reservation.id_location }}</strong></p>
        </div>
        <div class="concert-details">
          <h3>{{ $t('reserved_costumes_details') }} :</h3>
          <ul>
            <li v-for="deguisement in reservation.deguisements" :key="deguisement.id_costume" class="concert-item">
              <div class="concert-info">
                <p><strong>{{ deguisement.nom_costume }}</strong></p>
                <p>{{ $t('quantity') }} : {{ deguisement.quantite }}</p>
                <p>{{ $t('unit_price') }} : {{ deguisement.prix }} €</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="no-reservations">
      <p>{{ $t('no_reservations_found') }}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ReservationDeguisement",
  computed: {
    ...mapState('BaltrouilleStore', ['reservationsId']),
    ...mapState('ProfilStore', ['utilisateurConnecte'])
  },
  methods: {
    ...mapActions('BaltrouilleStore', ['getLocationDeguisementById']),
  },
  mounted() {
    if (this.utilisateurConnecte && this.utilisateurConnecte.id) {
      this.getLocationDeguisementById(this.utilisateurConnecte.id);
    }
  }
}
</script>

<style scoped>
.reservations-container {
  margin: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
}

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
