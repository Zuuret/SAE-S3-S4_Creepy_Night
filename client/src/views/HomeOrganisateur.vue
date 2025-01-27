<template>
  <div class="home-organisateur">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="main-content">
      <header>
        <h1>Bienvenue sur la page de l'organisateur</h1>
      </header>
      <section class="daily-stats">
        <h2>Chiffres du jour</h2>
        <div class="stat-item">
          <span class="stat-title">Places vendues aujourd'hui   :</span>
          <span class="stat-value">{{ billetsAchatAujourdHui }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  
  name: "HomeOrganisateur",
  components:{
    NavOrganisateur
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "getUtilisateurs"]),
    ...mapState("transactions", ["billetsAchatAujourdHui"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "organisateur";
    },
  },
  methods: {
    ...mapActions("transactions", ["fetchBilletsAchatAujourdHui"]),
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      console.log("Utilisateur non connecté, redirection vers /");
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé pour cet utilisateur.");
    } else {
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
</style>