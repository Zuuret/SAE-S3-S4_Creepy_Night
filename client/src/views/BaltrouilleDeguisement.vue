<template>
  <div>
    <NavBar />
    <div class="container">
      <h1 v-if="soiree">{{ $t('deguisements.titre', { date: soiree.date }) }}</h1>
      <p v-if="soiree">{{ soiree.description }}</p>

      <div class="costume-list" v-if="deguisements && deguisements.length">
        <div v-for="costume in deguisements" :key="costume.id_costume" class="costume-card">
          <img :src="costume.image" alt="Affiche du déguisement" class="affiche-deguisement" />
          <h2>{{ costume.nom_costume }}</h2>
          <p>{{ costume.description }}</p>
          <p>{{ $t('deguisements.prix', { prix: costume.prix }) }}</p>
          <router-link :to="`/baltrouille/${soiree.id_soiree}/deguisements/${costume.id_costume}`">
            <button>{{ $t('deguisements.louerCostume') }}</button>
          </router-link>
        </div>
      </div>

      <p v-else>{{ $t('deguisements.noCostumes') }}</p>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "BaltrouilleDeguisement",
  components: {
    NavBar,
  },
  computed: {
    ...mapState("BaltrouilleStore", ["soiree", 'deguisements']),
  },
  methods: {
    ...mapActions("BaltrouilleStore", ["getSoireeBaltrouilleById", "getDeguisementBySoiree"]),
  },
  mounted() {
    const soireeId = this.$route.params.soireeId;
    if (soireeId) {
      this.getSoireeBaltrouilleById(soireeId).then(() => {
        if (this.soiree) {
          this.getDeguisementBySoiree(soireeId);
        } else {
          console.error("Soirée introuvable.");
        }
      }).catch(error => {
        console.error("Erreur lors de la récupération de la soirée :", error);
      });
    } else {
      console.error("ID de la soirée manquant.");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-family: "Creepster", cursive;
  color: #ff4d4d;
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  line-height: 1.6;
}

.costume-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.costume-card {
  background-color: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.costume-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.affiche-deguisement {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
}

.costume-card h2 {
  font-size: 22px;
  margin-bottom: 10px;
  font-family: "Creepster", cursive;
  color: #ff4d4d;
}

.costume-card p {
  font-size: 16px;
  margin-bottom: 15px;
}

.costume-card button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.costume-card button:hover {
  background-color: #cc0000;
}

.costume-card button:active {
  background-color: #990000;
}

p {
  font-size: 18px;
  color: #888;
  margin-top: 30px;
}
</style>

