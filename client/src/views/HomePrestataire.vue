<template>
  <div v-if="hasAccess" class="home-prestataire">
    <h1>Bienvenue {{ utilisateurConnecte.societe }}</h1>
    <img :src="utilisateurConnecte.logo" alt="Logo prestataire" class="logo" />

  </div>
  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomePrestataire",
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
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
