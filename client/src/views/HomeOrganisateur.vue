<template>
  <div class="home-organisateur">
    <header>
      <h1>Bienvenue sur la page de l'organisateur</h1>
    </header>

    <section class="daily-stats">
      <h2>Chiffres du jour</h2>
      <div class="stat-item">
        <span class="stat-title">Places vendues aujourd'hui :</span>
        <span class="stat-value">{{ billetsAchatAujourdHui }}</span>
      </div>
    </section>

    <div class="card-container">
      <div class="card">
        <h2>Liste des Utilisateurs</h2>
        <table class="modern-table">
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
                <router-link
                  class="profile-link"
                  :to="{ name: 'UserProfile', params: { id: utilisateur.id } }"
                >
                  Voir Profil
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <h2>Liste des Organisateurs</h2>
        <table class="modern-table">
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
        <table class="modern-table">
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

      <div class="card">
        <h2>Demandes d'Inscription des Organisateurs</h2>
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demande in demandesOrganisateurs" :key="demande.id">
              <td>{{ demande.id }}</td>
              <td>{{ demande.nom }}</td>
              <td>{{ demande.prenom }}</td>
              <td>{{ demande.email }}</td>
              <td>{{ demande.telephone }}</td>
              <td>
                <button @click="handleAccepterDemandeOrganisateur(demande)">
                  Accepter
                </button>
                <button @click="rejeterDemandeOrganisateur(demande)">
                  Rejeter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <h2>Demandes d'Inscription des Prestataires</h2>
        <table class="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Société</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demande in demandesPrestataires" :key="demande.id">
              <td>{{ demande.id }}</td>
              <td>{{ demande.societe }}</td>
              <td>{{ demande.email }}</td>
              <td>
                <button @click="handleAccepterDemandePrestataire(demande)">
                  Accepter
                </button>
                <button @click="rejeterDemandePrestataire(demande)">
                  Rejeter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* Script inchangé pour l'instant */
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "HomeOrganisateur",
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapState("profil", [
      "utilisateurs",
      "organisateurs",
      "prestataires",
      "demandesPrestataires",
      "demandesOrganisateurs",
    ]),
    ...mapState("transactions", ["billetsAchatAujourdHui"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
  },
  methods: {
    ...mapActions("ProfilStore", ["fetchUtilisateurs", "fetchOrganisateurs", "fetchPrestataires"]),
    ...mapActions("transactions", ["fetchBilletsAchatAujourdHui"]),
    ...mapActions("profil", [
      "fetchUtilisateurs",
      "fetchOrganisateurs",
      "fetchPrestataires",
      "fetchDemandesPrestataires",
      "accepterDemandePrestataire",
      "accepterDemandeOrganisateur",
    ]),
    handleAccepterDemandePrestataire(demande) {
      this.accepterDemandePrestataire(demande);
    },
    rejeterDemandePrestataire(demande) {
      this.$store.commit("profil/removeDemandePrestataire", demande.id);
    },
    handleAccepterDemandeOrganisateur(demande) {
      this.accepterDemandeOrganisateur(demande);
    },
    rejeterDemandeOrganisateur(demande) {
      this.$store.commit("profil/removeDemandeOrganisateur", demande.id);
    },
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      console.log("Utilisateur non connecté, redirection vers /");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
      this.fetchUtilisateurs();
      this.fetchOrganisateurs();
      this.fetchPrestataires();
      this.fetchDemandesPrestataires();
      this.fetchBilletsAchatAujourdHui();
    }
  },
};
</script>

<style scoped>
/* Style global */
.home-organisateur {
  padding: 20px;
  background-color: #f4f5f7;
}

header h1 {
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.daily-stats {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.daily-stats h2 {
  font-size: 1.8em;
  color: #2c3e50;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  color: #555;
}

.stat-title {
  font-weight: bold;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(45% - 20px);
  min-width: 280px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 15px;
}

/* Style moderne pour les tableaux */
table.modern-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
}

table.modern-table thead {
  background-color: #2c3e50;
  color: #fff;
}

table.modern-table th,
table.modern-table td {
  padding: 12px 15px;
  text-align: left;
}

table.modern-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

table.modern-table tr:hover {
  background-color: #e0e7ff;
}

.profile-link {
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.2s, color 0.2s;
}

.profile-link:hover {
  transform: scale(1.1);
  color: #1f78b4;
}
</style>