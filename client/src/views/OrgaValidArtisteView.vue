<template>
  <div class="orga" style="display: flex; flex-direction: row">
    <div>
      <NavOrganisateur />
    </div>
    <div style="margin: 100px 0 0 200px">
      <h1>Validation de concert</h1>
      <p>Liste des artistes</p>
      <div>
        <p v-if="nbDecision()">Aucune proposition d'artiste.</p>
        <div v-for="(artiste) in artistes" :key="artiste.id">
          <li v-if="artiste.decision == 'null'">
            <div>
              <div style="margin: auto">{{ artiste.nomGroupe }}</div>
              <div style="margin: auto">{{ artiste.nbMembres }}</div>
              <div style="margin: auto">
                <div class="button-box">
                  <button @click="setDecision(['true', artiste.id])">Accepter</button>
                  <button @click="setDecision(['false', artiste.id])">Refuser</button>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  name: 'OrgaValidArtisteView',
  components: {NavOrganisateur},
  data: () => ({
  }),
  computed: {
    ...mapState('ConcertStore',['artistes']),
  },
  methods: {
    ...mapActions('ConcertStore',['setDecision', 'getArtistes']),
    nbDecision(){
      let nbdecis = 0;
      for (let i in this.artistes) {
        if (this.artistes[i].decision === 'null') nbdecis++;
      }
      return nbdecis < 1;
    }
  },
  mounted() {
    this.getArtistes();
  }
}

</script>

<style scoped>
.orga {
  background-color: #F0F0F0;
}

div {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  font-size: 1.1em;
  text-align: center;
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