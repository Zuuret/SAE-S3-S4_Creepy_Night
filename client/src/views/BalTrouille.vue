<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="container">
      <h1>Bal'Trouille</h1>
      <p>Venez profiter des soirées effrayantes du festival !</p>

      <div class="soirees-list">
        <div v-for="soiree in soirees" :key="soiree.id_soiree" class="soiree-card">
          <h2>{{ soiree.date }}</h2>
          <p>{{ soiree.description }}</p>
          <router-link :to="`/baltrouille/${soiree.id_soiree}/deguisements`">
            <button @click="acheterPlace(soiree)">Acheter ma place</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "BalTrouille",
  components: {
    NavBar,
  },
  computed: {
    ...mapState('BaltrouilleStore', ['soirees'])
  },
  methods: {
    ...mapActions('BaltrouilleStore', ['getAllSoireeBaltrouille']),
    acheterPlace(soiree) {
      alert(`Votre place pour la soirée "${soiree.date}" a bien été achetée !`);
    },
  },
  mounted() {
    this.getAllSoireeBaltrouille()
  }
};
</script>


<style scoped>
.container {
text-align: center;
padding: 20px;
}

h1 {
font-family: 'Creepster', cursive;
color: black;
font-size: 50px;
margin-bottom: 10px;
}

p {
font-size: 18px;
color: #333;
margin-bottom: 30px;
}

.soirees-list {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
}

.soiree-card {
background-color: rgba(177, 52, 52, 0.8);
color: white;
padding: 20px;
border-radius: 10px;
text-align: center;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.soiree-card h2 {
margin-bottom: 10px;
font-size: 22px;
}

.soiree-card p {
margin-bottom: 15px;
font-size: 16px;
}

.soiree-card button {
background-color: #d32f2f;
color: white;
border: none;
border-radius: 5px;
padding: 10px 15px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;
}

.soiree-card button:hover {
background-color: #b71c1c;
}

.soiree-card button:active {
background-color: #7f1d1d;
}
</style>