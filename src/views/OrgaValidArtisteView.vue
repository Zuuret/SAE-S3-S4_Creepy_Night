<template>
  <div class="orga">
    <h1>Validation de concert</h1>
    <p>Liste des artistes</p>
    <div v-for="(artiste) in artistes" :key="artiste.id">
      <li v-if="artiste.decision == 'null'">
        <div>
          <div>{{ artiste.nomGroupe }}</div>
          <div>{{ artiste.nbMembres }}</div>
          <div>
            <div class="button-box">
              <button @click="setDecision(['true', artiste.id])">Accepter</button>
              <button @click="setDecision(['false', artiste.id])">Refuser</button>
            </div>
          </div>
        </div>
      </li>
      <!-- p v-if="artiste.decision != 'null'">Aucune proposition d'artistep <p -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrgaValidArtisteView',
  data: () => ({
  }),
  computed: {
    ...mapState(['artistes']),
  },
  methods: {
    ...mapActions(['setDecision', 'getArtistes']),
  },
  mounted() {
    this.getArtistes();
  }
}

</script>

<style>
.orga {
  background-color: #F0F0F0;
}

div {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 15px;
}

/* Conteneur pour chaque artiste */
li {
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Section du nom du groupe */
li div:first-child {
  flex: 2;
  font-size: 1em;
  color: #333;
}

/* Section du nombre de membres */
li div:nth-child(2) {
  flex: 1;
  font-size: 1em;
  color: #333;
  text-align: center;
}

/* Conteneur des boutons dans la même box */
li div:last-child {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Wrapper pour les boutons, afin de les regrouper */
.button-box {
  display: flex;
  gap: 10px;
}

/* Boutons d'action */
button {
  padding: 8px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.9em;
}

button:first-of-type {
  background-color: #4CAF50;
  color: white;
}

button:last-of-type {
  background-color: #E74C3C;
  color: white;
}

button:hover {
  opacity: 0.9;
}

</style>