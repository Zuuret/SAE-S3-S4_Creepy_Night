<template>
  <div>
    <div><NavBar /></div>
    <h1 class="titre">Cashless</h1>
    <div class="bordure">
      <h3>Monnaie restante</h3>
      <p class="solde">{{ utilisateurConnecte.solde }}</p>

    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ReservationCinepeurValidation',
  components: {NavBar},
  data: () => ({
  }),
  computed: {
    ...mapState('ProfilStore',['utilisateurConnecte']),
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
/* Style global pour le formulaire */
* {
  margin: 0px;
  padding: 10px;
  text-decoration: none;
}

.titre {
  margin-top: 50px;
  padding: 20px;
}

div {
  color: #ff4444;
  text-align: center;
  background-color: #111;
  padding: 10px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.solde {
  font-size: 40px;
}

.bordure {
  background-color: #151515;
  border: 1px solid red;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
  border-radius: 8px;
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
