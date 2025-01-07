<template>
  <div class="home-organisateur">
    <h1>Bienvenue sur la page de l'organisateur</h1>
    <p>Nombre de billets achetés aujourd'hui : {{ billetsAchatAujourdHui }}</p>

    <div class="card-container">
      <div class="card">
        <h2>Liste des Utilisateurs</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Profil</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="utilisateur in utilisateurs" :key="utilisateur.id">
              <td>{{ utilisateur.id }}</td>
              <td>{{ utilisateur.prenom }}</td>
              <td>{{ utilisateur.nom }}</td>
              <td>{{ utilisateur.email }}</td>
              <td>
                <router-link :to="{ name: 'UserProfile', params: { id: utilisateur.id } }">Voir Profil</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <h2>Liste des Organisateurs</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="organisateur in organisateurs" :key="organisateur.id">
              <td>{{ organisateur.id }}</td>
              <td>{{ organisateur.nom }}</td>
              <td>{{ organisateur.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "HomeOrganisateur",
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapState("ProfilStore", ["utilisateurs", "organisateurs", "prestataires"]),
    ...mapState("transactions", ["billetsAchatAujourdHui"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
  },
  methods: {
    ...mapActions("ProfilStore", ["getAllUtilisateur","getAllOrganisateur","getAllPrestataire"]),
    ...mapActions("transactions", ["fetchBilletsAchatAujourdHui"]),
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
      this.fetchBilletsAchatAujourdHui();
    }
  }
};
</script>

<style scoped>
.home-organisateur {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 30%; /* Ajustez la largeur selon vos besoins */
  margin-bottom: 20px;
}

h2 {
  color: #ff0000; /* Couleur pour les titres */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

</style>
