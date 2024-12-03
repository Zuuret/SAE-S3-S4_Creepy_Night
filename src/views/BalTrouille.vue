<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="container">
      <h1>Bal'Trouille</h1>
      <p>Venez profiter des soirées effrayantes du festival !</p>

      <div class="soirees-list">
        <div
            v-for="(soiree, index) in soirees"
            :key="index"
            class="soiree-card"
        >
          <h2>{{ soiree.date }}</h2>
          <p>{{ soiree.description }}</p>
          <button @click="acheterPlace(soiree)">Acheter ma place</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "BalTrouille",
  components: {
    NavBar,
  },
  data() {
    return {
      soirees: [
        { date: "27 octobre 2025", description: "Soirée d'ouverture terrifiante avec DJ Zombie." },
        { date: "28 octobre 2025", description: "Soirée Disco'Horreur avec un décor ensanglanté." },
        { date: "29 octobre 2025", description: "Soirée Masques et Mystères - Venez masqués !" },
        { date: "30 octobre 2025", description: "Soirée spéciale Thriller avec surprises macabres." },
        { date: "31 octobre 2025", description: "Grande Nuit d'Halloween avec un concours de costumes !" },
        { date: "1 novembre 2025", description: "Soirée des âmes perdues avec ambiance gothique." },
        { date: "2 novembre 2025", description: "Soirée de clôture - Dansez avec les esprits !" },
      ],
    };
  },
  methods: {
    acheterPlace(soiree) {
      alert(`Votre place pour la soirée "${soiree.date}" a bien été achetée !`);
    },
  },
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