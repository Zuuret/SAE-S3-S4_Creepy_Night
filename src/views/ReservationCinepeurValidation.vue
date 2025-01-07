<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <div v-if="ok === null" class="bordure">
      <p>Voulez-vous utiliser votre cashless ?</p>
      <button @click="ok = true">Oui</button>
      <button @click="ok = false">Non</button>
    </div>
    <div v-if="ok === false" class="bordure">
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
    <div v-if="ok === true" class="bordure">

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
    ...mapState(['coordonneesBancaire']),
  },
  methods: {
    ...mapActions(['validerPaiement']),
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.bordure {
  background-color: #151515;
  border: 1px solid red;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
  border-radius: 8px;
}

div {
  color: #ff4444;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h3 {
  text-align: center;
  color: red;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: red;
}


button {
  width: 100%;
  padding: 12px;
  background-color: black;
  color: red;
  border: 1px solid darkred;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0A0A0A;
}

/* Message de confirmation */
.success-message {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid darkred;
  border-radius: 4px;
  color: #red;
  text-align: center;
}

.success-message p {
  margin: 0;
}

.success-message strong {
  font-weight: bold;
}
</style>
