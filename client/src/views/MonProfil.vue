<template>
  <div class="profil-container">
    <h1>{{ $t('welcomeProfile') }}</h1>
    <div class="profil-infos">
      <p v-if="utilisateurConnecte"><strong>{{ $t('lastName') }} :</strong> {{ utilisateurConnecte.nom }}</p>
      <p><strong>{{ $t('firstName') }} :</strong> {{ utilisateurConnecte.prenom }}</p>
      <p><strong>{{ $t('email') }} :</strong> {{ utilisateurConnecte.email || utilisateurConnecte.mail }}</p>
      <p><strong>{{ $t('walletBalance') }} :</strong> {{ utilisateurConnecte.solde }} €</p>
    </div>
    <router-link to="/cashless">
      <button class="recharge-button">{{ $t('rechargeWallet') }}</button>
    </router-link>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "MonProfil",
  computed: {
    ...mapState('ProfilStore', ['utilisateurConnecte']),
  },
  methods: {
    ...mapActions('ProfilStore', ['getUserById']),
  },
  mounted() {
    const utilisateurId = this.utilisateurConnecte.id
    if (this.utilisateurConnecte) {
      this.getUserById(utilisateurId);
    } else {
      this.$router.push("/connexion");
    }
  },
};
</script>

<style scoped>
.profil-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #222;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #e91e63;
}

.profil-infos {
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
}

.profil-infos p {
  margin: 10px 0;
  font-size: 1.2em;
}

.profil-infos p strong {
  color: #ff5722;
}


.recharge-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #009688;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.recharge-button:hover {
  background-color: #00796b;
}
</style>
