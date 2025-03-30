<template>
  <div class="home-organisateur">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="main-content">
      <header>
        <h1>Liste des organisateurs de CreepyNight</h1>
      </header>

      <div class="card-container">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  
  name: "OrgaOrganisateurs",
  components:{
    NavOrganisateur
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapState("profil", [ "organisateurs", ]),
    ...mapState("transactions", ["billetsAchatAujourdHui"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
  },
  methods: {
    ...mapActions("ProfilStore", ["fetchOrganisateurs"]),
    ...mapActions("transactions", ["fetchBilletsAchatAujourdHui"]),
    ...mapActions("profil", [ "fetchOrganisateurs" ]),
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      console.log("Utilisateur non connecté, redirection vers /");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
      this.fetchOrganisateurs();
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
</style>