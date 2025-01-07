<template>
  <div v-if="hasAccess" class="home-prestataire">
    <h1>Bienvenue {{ utilisateurConnecte.societe }}</h1>
    <img :src="utilisateurConnecte.logo" alt="Logo prestataire" class="logo" />
    <h2>Mon livre d'or</h2>
    <div v-for="message in livreDOr" :key="message.id" class="message">
      <p><strong>{{ message.nomUtilisateur }}</strong> ({{ message.date }})</p>
      <p>{{ message.message }}</p>
      <div class="rating">
        <span v-for="i in message.evaluation" :key="i">⭐</span>
      </div>
    </div>
  </div>
  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "HomePrestataire",
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    ...mapState('PrestataireStore', ['livreDOr']),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
  },
  methods: {
    ...mapActions("PrestataireStore", ['getLivreDOr'])
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      console.log("Aucun utilisateur connecté, redirection...");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
      console.log("Accès autorisé, utilisateur :", this.utilisateurConnecte);
    }
    this.getLivreDOr(this.utilisateurConnecte.id)
  },
};
</script>

<style scoped>
.home-prestataire {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.logo {
  max-width: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
