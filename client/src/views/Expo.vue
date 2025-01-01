<template>

  <!-- Faire des emplacements réservés ou non -> Si non reservé, est cliquable. -->
  <div>
    <NavBar />
    <h1>Liste des expositions</h1>
    <div class="expo-dispo">
      <div v-for="oeuvre in oeuvres" :key="oeuvre.id" class="expo-card">
        <div v-if="oeuvre.createur != 'null'">
          <img class="expo-img" :src="oeuvre.image" alt="Affiche du expo" />
          <p>{{ oeuvre.createur }} - {{ oeuvre.dateCrea }}</p>
          <p>{{ oeuvre.description }}</p>
        </div>
        <div v-else>
          <router-link :to="`/expo/${oeuvre.id}`">
            <button>Réserver ma place</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'PageExpo',
  components: {NavBar},
  data() {
    return {};
  },
  computed: {
    ...mapState(['oeuvres'])
  },
  methods: {
    ...mapActions(['getOeuvres']),
  },
  mounted() {
    this.getOeuvres();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
/* Titre principal */
h1 {
  text-align: center;
  font-size: 2.5em;
  font-family: 'Creepster', cursive;
  letter-spacing: 2px;
  color: #ff4444;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.5);
  margin-bottom: 20px;
}

/* Disposition des cartes */
.expo-dispo {
  display: grid;
  justify-content: center; /* Centrer la grille */
  gap: 20px;
  grid-template-columns: repeat(6, 300px);
}

/* Carte de l'expo */
.expo-card {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  background-color: #222;
  border: 2px solid #ff4444;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4), 0 0 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Effet de survol pour un aspect dynamique */
.expo-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 255, 255, 0.2);
}

/* Image du expo */
.expo-img {
  width: 90%;
  border-radius: 4px;
  filter: grayscale(80%) brightness(80%);
  transition: filter 0.3s;
}

.expo-img:hover {
  filter: grayscale(0%) brightness(100%);
}

/* Texte de la carte */
.expo-card p {
  font-size: 1.2em;
  font-family: 'Creepster', cursive;
  margin: 10px 0;
  color: #f2f2f2;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
}

/* Prix en rouge sang */
.expo-card p:last-of-type {
  font-family: 'Creepster', cursive;
  color: #ff4444;
  font-weight: bold;
  font-size: 1.4em;
}

.expo-card:hover {
  animation: glow 1.5s infinite alternate;
}

button {
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Creepster', cursive;
  letter-spacing: 3px;
  color: #fff;
  background-color: #ff4444;
  border: 2px solid #ff4444;
  border-radius: 8px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

/* Effet de survol */
button:hover {
  color: #111;
  background-color: #ff0000;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}

/* Effet d’animation de sang en fond */
button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, transparent 20%, #ff0000);
  border-radius: 50%;
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
  transform: translate(-50%, -50%);
  z-index: 0;
}

/* Agrandit l'effet sanglant au survol */
button:hover::before {
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
}

button:focus {
  outline: none;
}

/* Texte du bouton au-dessus de l’effet sang */
button span {
  position: relative;
  z-index: 1;
}
</style>

