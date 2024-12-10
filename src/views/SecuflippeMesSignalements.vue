<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <div class="signalements-container">
      <h1>Liste des signalements</h1>
      <div v-if="signalement.length === 0" class="no-signalements">
        Aucun signalement n'a été enregistré.
      </div>
      <div v-for="(signalement, index) in signalement" :key="index" class="signalement-card">
        <h2>Signalement {{ index + 1 }}</h2>
        <p><strong>Type :</strong> {{ signalement.typeIncident }}</p>
        <p><strong>Description :</strong> {{ signalement.descriptionIncident }}</p>
        <p><strong>Zone :</strong> {{ signalement.zoneIncident }}</p>
        <p><strong>Position :</strong>
          Latitude: {{ signalement.positionUtilisateur.latitude }},
          Longitude: {{ signalement.positionUtilisateur.longitude }}
        </p>
        <p><strong>Heure :</strong> {{ new Date(signalement.timestamp).toLocaleTimeString() }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "SecuflippeMesSignalements",
  components: {NavBar},
  computed: {
    ...mapState(['signalement'])
  },
  methods: {
    ...mapActions(['getAllSignalements'])
  },
  mounted() {
    this.getAllSignalements()
  }
}
</script>

<style scoped>
.signalements-container {
  margin: 50px auto;
  padding: 20px;
  max-width: 800px;
  background: linear-gradient(145deg, #1a1a1a, #3a0000);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  color: #eaeaea;
}

h1 {
  font-family: "Creepster", cursive;
  color: #e52d27;
  text-align: center;
  margin-bottom: 20px;
}

.signalement-card {
  background: #2e0000;
  border: 2px solid #b71c1c;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

</style>