<template>
    <div class="home-organisateur">
      <div class="navbar">
        <NavOrganisateur />
      </div>
  
      <div class="main-content">
        <div class="card-container">
          <div class="card">
            <h1>Mon Profil</h1>
            <div class="profil-infos">
                <p><strong>Nom :</strong> {{ utilisateurConnecte.nom }}</p>
                <p><strong>Prénom :</strong> {{ utilisateurConnecte.prenom }}</p>
                <p><strong>Email :</strong> {{ utilisateurConnecte.email }}</p>
                <p><strong>Téléphone :</strong> {{ utilisateurConnecte.numTelephone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import NavOrganisateur from "@/components/NavOrganisateur.vue";
  
  export default {
    
    name: "OrgaProfil",
    components:{
      NavOrganisateur
    },
    computed: {
        ...mapState('ProfilStore', ['utilisateurConnecte']),
      hasAccess() {
        return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
      },
    },
    methods: {
        ...mapActions('ProfilStore', ['getUserbyId']),
    },
    mounted() {
        const utilisateurId = this.utilisateurConnecte.id
      if (!this.utilisateurConnecte) {
        console.log("Utilisateur non connecté, redirection vers /");
        this.$router.push("/");
      } else if (!this.hasAccess) {
        console.log("Accès refusé pour cet utilisateur.");
      } else {
        this.getUserbyId(utilisateurId);
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
    width: calc(45% - 20px);
    min-width: 280px;
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