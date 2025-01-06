<template>
  <div v-if="hasAccess">
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
    }
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
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
