<template>
  <form @submit.prevent="validerPaiement">
    <h3>Coordonnées bancaires</h3>
    <div>
      <label for="nom">Nom sur la carte :</label>
      <input type="text" v-model="nom" required />
    </div>
    <div>
      <label for="numeroCarte">Numéro de carte :</label>
      <input type="text" v-model="numeroCarte" required />
    </div>
    <div>
      <label for="expiration">Date d'expiration :</label>
      <input type="month" v-model="expiration" required />
    </div>
    <div>
      <label for="cvv">CVV :</label>
      <input type="text" v-model="cvv" required />
    </div>
    <button type="submit">Confirmer le paiement</button>
  </form>

  <div v-if="coordonnees_bancaire" class="success-message">
    <p>Votre paiement à bien été pris en compte : <strong>{{ utilisateur.prenom }} {{ utilisateur.nom }}</strong></p>
  </div>
</template>

<script setup>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ValidationReservation',
  data: () => ({
    nom: '',
    numeroCarte: '',
    expiration: '',
    cvv: '',
  }),
  computed: {
    ...mapState(['coordonnees_bancaire']),
  },
  methods: {
    ...mapActions(),
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>