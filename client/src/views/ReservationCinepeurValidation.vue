<template>
  <div>
    <div><NavBar /></div>
    <div style="margin-top: 150px"></div>
    <div v-if="ok === null">
      <p>Voulez-vous utiliser votre cashless ?</p>
      <button @click="ok = true">Oui</button>
      <button @click="ok = false">Non</button>
    </div>
    <div v-if="ok === false" >
      <form @submit.prevent="validerPaiement({nom, numeroCarte, dateExpiration, cvv})">
        <h3>Coordonnées bancaires</h3>
        <div>
          <label for="nom">Nom sur la carte :</label>
          <input id="nom" name="nom" type="text" v-model="nom" required />
        </div>
        <div>
          <label for="numeroCarte">Numéro de carte :</label>
          <input id="numeroCarte" name="numeroCarte" type="text" v-model="numeroCarte" required />
        </div>
        <div>
          <label for="dateExpiration">Date d'expiration :</label>
          <input id="dateExpiration" name="dateExpiration" type="month" v-model="dateExpiration" required />
        </div>
        <div>
          <label for="cvv">CVV :</label>
          <input id="cvv" name="cvv" type="text" v-model="cvv" required />
        </div>
        <button type="submit">Confirmer le paiement</button>
      </form>
      <div v-if="coordonneesBancaire" class="success-message">
        <p>Votre paiement a bien été pris en compte</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ReservationCinepeurValidation',
  components: {NavBar},
  data: () => ({
    nom: '',
    numeroCarte: '',
    dateExpiration: '',
    cvv: '',
    ok: null,
  }),
  computed: {
    ...mapState('CinemaStore',['coordonneesBancaire']),
  },
  methods: {
    ...mapActions('CinemaStore',['validerPaiement']),
  },
  mounted() {
  }
}
</script>

<style scoped>
/* Style global pour le formulaire */
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h3 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="month"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

/* Message de confirmation */
.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #e6ffed;
  border: 1px solid #a2dfab;
  border-radius: 4px;
  color: #2f8a5f;
  text-align: center;
}

.success-message p {
  margin: 0;
}

.success-message strong {
  font-weight: bold;
}
</style>
