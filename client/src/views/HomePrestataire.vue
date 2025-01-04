<template>
  <div>
    <h1 v-if="hasAccess">Prestataire</h1>
    <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
  </div>
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
