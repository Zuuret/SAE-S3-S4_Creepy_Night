<template>
    <div class="home-organisateur">
      <div class="navbar">
        <NavOrganisateur />
      </div>
  
      <div class="main-content">
        <header>
          <h1>Gérer les demandes</h1>
        </header>
        <div class="card-container">
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
                  <td>{{ demande.tel }}</td>
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
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import NavOrganisateur from "@/components/NavOrganisateur.vue";
  
  export default {
    
    name: "OrgaDemandes",
    components:{
      NavOrganisateur
    },
    computed: {
      ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
      ...mapState("profil", [
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
        "fetchDemandesPrestataires",
        "fetchDemandesOrganisateurs",
        "accepterDemandePrestataire",
        "accepterDemandeOrganisateur",
        "deleteDemandePrestataire",
        "deleteDemandeOrganisateur",
      ]),
      handleAccepterDemandePrestataire(demande) {
        this.accepterDemandePrestataire(demande);
      },
      async rejeterDemandePrestataire(demande) {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir rejeter cette demande ?");
        if (confirmDelete) {
          try {
            await this.deleteDemandePrestataire(demande.id);
          } catch (error) {
            console.error("Erreur lors de la suppression de la demande prestataire", error);
          }
        }
      },
      async rejeterDemandeOrganisateur(demande) {
        const confirmDelete = confirm("Êtes-vous sûr de vouloir rejeter cette demande ?");
        if (confirmDelete) {
          try {
            await this.deleteDemandeOrganisateur(demande.id);
          } catch (error) {
            console.error("Erreur lors de la suppression de la demande organisateur", error);
          }
        }
      },
      handleAccepterDemandeOrganisateur(demande) {
        this.accepterDemandeOrganisateur(demande);
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
        this.fetchDemandesOrganisateurs();
        this.fetchDemandesPrestataires();
        this.fetchBilletsAchatAujourdHui();
      }
    },
  };
  </script>
  
  <style scoped>
  .home-organisateur {
    display: flex;
    height: 100vh;
    background-color: #f4f5f7;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
    padding-left: 300px;
  }
  
  header h1 {
    text-align: center;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
  }
  
.card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    transition: transform 0.2s, box-shadow 0.2s;
}
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
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