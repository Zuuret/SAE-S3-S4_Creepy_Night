<template>
  <div class="container">
    <h1>Choisissez un déguisement</h1>
    <div class="deguisement-container">
      <div v-for="(deguisement, index) in deguisements" :key="index" class="deguisement">
        <router-link :to="`/baltrouille/deguisement/${deguisement.id_costume}`">
          <div class="deguisement_spe">
            <img :src="deguisement.image" alt="Affiche du déguisement" class="affiche_deguisement" />
            <h2>{{ deguisement.nom_costume }}</h2>
            <p>{{ deguisement.prix }} €</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BaltrouilleDeguisement",
  computed: {
    ...mapState('BaltrouilleStore', ['deguisements']),
  },
  methods: {
    ...mapActions('BaltrouilleStore', ["getAllDeguisement"]),
  },
  mounted() {
    this.getAllDeguisement();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.deguisement-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.deguisement {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 280px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.deguisement:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.deguisement_spe {
  padding: 15px;
  text-align: center;
}

.affiche_deguisement {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

h2 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #444;
}

p {
  font-size: 1.2em;
  color: #888;
}
</style>
