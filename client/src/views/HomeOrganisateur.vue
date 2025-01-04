<template>
  <div>
    <h1 v-if="hasAccess">Bienvenue sur la page de l'organisateur</h1>
    <p v-if="hasAccess">Contenu réservé aux organisateurs.</p>

    <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>

    <div v-if="hasAccess">
      <h2>Liste des Utilisateurs</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in utilisateurs" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.prenom }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
        </tr>
        </tbody>
      </table>

      <h2>Liste des Organisateurs</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="organisateur in organisateurs" :key="organisateur.id">
          <td>{{ organisateur.id }}</td>
          <td>{{ organisateur.prenom }}</td>
          <td>{{ organisateur.nom }}</td>
          <td>{{ organisateur.email }}</td>
        </tr>
        </tbody>
      </table>

      <h2>Liste des Prestataires</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Société</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="prestataire in prestataires" :key="prestataire.id">
          <td>{{ prestataire.id }}</td>
          <td>{{ prestataire.societe }}</td>
          <td>{{ prestataire.email }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "HomeOrganisateur",
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    ...mapState("ProfilStore", ["utilisateurs", "organisateurs", "prestataires"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
  },
  methods: {
    ...mapActions("ProfilStore", ["getAllUtilisateur", "getAllOrganisateur", "getAllPrestataire",]),
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      console.log("Utilisateur non connecté, redirection vers /");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
      this.getAllUtilisateur();
      this.getAllOrganisateur();
      this.getAllPrestataire();
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.error {
  color: red;
  font-weight: bold;
  margin: 20px 0;
}
</style>
