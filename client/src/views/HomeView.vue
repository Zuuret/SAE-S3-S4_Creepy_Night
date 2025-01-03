<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <div class="accueil">
      <img src="@/assets/fond_Accueil.png" alt="CreepyNight_accueil" class="accueil_image">
      <div class="compte-rebours">
        <CompteRebours />
      </div>
      <div class="intro">
        <h1 class="titre-partie" id="titre-intro">
          Bienvenue à Creepy Night, le festival
          incontournable de la peur !
        </h1>
        <div class="intro-partie">
          <div class="description-intro">
            <p class="introduction">
              Plongez dans une expérience unique et immersive dédiée à l'univers fascinant de la
              peur et du mystère. Pendant une semaine, vibrez au rythme d’un programme riche et
              captivant mêlant expositions, projections cinématographiques, concerts live et bien plus
              encore. Que vous soyez un amateur de sensations fortes, un passionné de cinéma
              fantastique ou simplement curieux, Creepy Night vous promet des émotions inoubliables.
            </p>
            <button class="btn-ticket"><router-link to="/billet">Tickets et abonnements</router-link></button>
          </div>
          <div class="image-intro">
            <img alt="creepynight" src="@/assets/img-intro-1.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-2.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-3.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-4.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-5.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-6.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-7.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-8.png" class="image-style">
            <img alt="creepynight" src="@/assets/img-intro-9.png" class="image-style">
          </div>
        </div>
      </div>
      <div class="activites">
        <h1 class="titre-partie" id="titre-activite">Un programme terrifiant, et flexible ?!</h1>
        <div class="lamelles-container">
          <div
              v-for="(activite, index) in activites"
              :key="index"
              class="lamelle"
              :style="{ backgroundImage: `url(${activite.image})` }"
          >
            <h2 class="titre-activites">{{ activite.titre }}</h2>
            <p class="description-activite">{{ activite.description }}</p>
          </div>
        </div>
      </div>
      <div class="pourquoi-venir">
        <h1 class="titre-partie" id="titre-pourquoi-venir">Pourquoi venir à Creepy Night ?</h1>
        <p class="puce">1. Une ambiance unique : Plongez dans un univers où
          chaque détail est pensé pour éveiller vos sens et votre
          imaginaire.
        </p>
        <p class="puce">
          2. Une expérience pour tous : Seul, entre amis ou en
          famille, Creepy Night est l’événement idéal pour partager des
          moments riches en émotions.
        </p>
        <p class="puce">
          3. Des artistes de renom : Profitez de performances
          inédites et de rencontres avec des créateurs et talents du
          genre horrifique.</p>
      </div>

      <div v-if="utilisateurConnecte" class="welcome-message">
        Bonjour {{ utilisateurConnecte.prenom }} {{ utilisateurConnecte.nom }}
      </div>
    </div>
    <footer class="footer">
      <div class="footer-content">
        <div class="reste-connectes">
          <h2>Restez connectés</h2>
          <p>
            Pour tout savoir sur le programme, les artistes invités et les surprises à venir, suivez-nous
            sur les réseaux sociaux :
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank">Facebook</a> |
            <a href="https://www.instagram.com" target="_blank">Instagram</a> |
            <a href="https://www.twitter.com" target="_blank">Twitter</a>
          </div>
        </div>
        <div class="contact-info">
          <p>Creepy Night : La peur n’a jamais été aussi excitante !</p>
          <p>Vous êtes un artiste et vous voulez nous rejoindre ?</p>
          <p>Envoyez un mail à : <a href="mailto:pasencore@choisit.com">pasencore@choisit.com</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import CompteRebours from '@/components/CompteRebours.vue';
import NavBar from "@/components/NavBar.vue";

import cariHorreurImg from "@/assets/carihorreur.jpg";
import cauchemarathonImg from "@/assets/cauchemarathon.jpg";
import cinepeurImg from "@/assets/cinepeur.jpg";
import concertsImg from "@/assets/concert.jpg";
import balTrouilleImg from "@/assets/baltrouille.jpg";
import expoImg from "@/assets/expo.jpg";

export default {
  components: {
    CompteRebours,
    NavBar,
  },
  data() {
    return {
      utilisateurConnecte: null,
      activites: [
        {
          titre: "Carihorreur",
          description: "Entrez dans le Carihorreur, un club nocturne comme nul autre. Ici, l’obscurité s’allume au rythme d’un son envoûtant et électrisant...",
          image: cariHorreurImg,
        },
        {
          titre: "Cauchemarathon",
          description: "Choisissez votre circuit et lancez-vous dans une course où chaque pas vous rapproche de vos pires frayeurs...",
          image: cauchemarathonImg,
        },
        {
          titre: "Cinépeur",
          description: "Venez frissonner au Cinépeur devant une sélection exclusive de films cultes, de classiques du genre et de courts-métrages inédits...",
          image: cinepeurImg,
        },
        {
          titre: "Concerts",
          description: "Chaque soir, des concerts live vous transporteront dans une ambiance envoûtante, mêlant musique sombre, énergie et atmosphère immersive...",
          image: concertsImg,
        },
        {
          titre: "Bal’trouille",
          description: "Enfilez votre plus beau masque et plongez dans une nuit aussi terrifiante que amusante...",
          image: balTrouilleImg,
        },
        {
          titre: "Expositions",
          description: "Découvrez des œuvres troublantes et immersives créées par des artistes passionnés par le mystère et l'horreur...",
          image: expoImg,
        },
      ],
    };
  },
  mounted() {
    const utilisateur = localStorage.getItem('utilisateurConnecte');
    if (utilisateur) {
      this.utilisateurConnecte = JSON.parse(utilisateur);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.accueil .accueil_image {
  margin-top: 5%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.compte-rebours {
  position: absolute;
  top: 60%;
  left: 52%;
  transform: translate(-50%, -50%);
}

#titre-intro{
  color: white;
}

.intro{
  padding-top: 20px;
  text-align: center;
  background-color: #AD0918;
  height: 100vh;
}

.intro-partie{
  display: flex;
}

.introduction{
  font-size: 200%;
  margin: 10%;
  text-align: justify;
}

.activites {
  padding-top: 20px;
  text-align: center;
  background-color: black;
  color: white;
  height: 100vh;
}

.description-intro{
  width: 100vw;
  font-family: Arial, sans-serif;
  color: white;
}

.btn-ticket{
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-intro {
  position: relative;
  height: 70vh; /* Ajuste la hauteur en fonction de tes besoins */
  width: 100%; /* Utilise tout l'espace disponible */
  display: block;
  margin: auto;
}

.image-style {
  position: absolute;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Exemples de positions pour chaque image */
.image-style:nth-child(1) {
  top: 13%;
  left: 10%;
  transform: rotate(-10deg);
  z-index: 2;
}

.image-style:nth-child(2) {
  width: 180px;
  top: 20%;
  left: 27%;
  transform: rotate(15deg);
  z-index: 1;

}

.image-style:nth-child(3) {
  top: 38%;
  left: 20%;
  transform: rotate(-5deg);
  z-index: 3;

}

.image-style:nth-child(4) {
  width: 200px;
  top: 43%;
  left: 38%;
  transform: rotate(5deg);
  z-index: 4;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(5) {
  width: 70px;
  top: 63%;
  left: 20%;
  transform: rotate(-8deg);
  z-index: 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(6) {
  width: 200px;
  top: 21%;
  left: 45%;
  transform: rotate(-20deg);
  z-index: 5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(7) {
  width: 150px;
  top: 33%;
  left: 60%;
  transform: rotate(20deg);
  z-index: 3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(8) {
  top: 56%;
  left: 40%;
  transform: rotate(8deg);
  z-index: 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(9) {
  top: 53%;
  left: 52%;
  transform: rotate(10deg);
  z-index: 4;
}


.image-style:hover {
  transform: scale(1.1) rotate(0deg);
  z-index: 10;
}

#titre-activite{
  color: white;
}

.titre-activites{
  font-family: 'Creepster', cursive;
  font-size: 200%;
}

.description-activite{
  color: white;
  font-family: 'Creepster', cursive;
  padding: 25px;
}

.lamelles-container {
  display: flex;
  flex-direction: row;
  gap: 2px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.lamelle {
  background-color: rgba(0, 0, 0, 0.6);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  overflow: hidden;
  width: 8%;
  height: 70vh;
  transition: width 0.4s ease, margin 0.4s ease;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
}

.lamelle:hover {
  width: 25%; /* Taille agrandie */
}

.lamelle h3 {
  margin: 0;
}

.lamelle p {
  opacity: 0;
  margin-top: 10px;
  transition: opacity 0.3s ease;
  font-size: 150%;
}

.lamelle:hover p {
  opacity: 1;
}

.titre-partie{
  padding-top: 50px;
  margin-bottom: 50px;
  font-family: 'Creepster', cursive;
  color: white;
  font-size: 300%;
}

.pourquoi-venir{
  padding-top: 20px;
  text-align: center;
  background-color: #AD0918;
  color: white;
  height: 100vh;
}

#titre-pourquoi-venir{
  margin-bottom: 11%;
}

.puce{
  font-size: 200%;
  margin: 80px;
  text-align: justify;
}

.footer {
  background-color: #222;
  color: white;
  padding: 40px 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reste-connectes {
  margin-bottom: 20px;
}

.reste-connectes h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.reste-connectes p {
  font-size: 16px;
  margin-bottom: 10px;
  color: white;
}

.social-links a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

.social-links a:hover {
  text-decoration: underline;
}

.contact-info p {
  font-size: 16px;
  color: white;
}

.contact-info a {
  color: #AD0918;
  text-decoration: none;
  font-weight: bold;
}

.contact-info a:hover {
  text-decoration: underline;
}

.welcome-message {
  font-size: 24px;
  color: black;
  text-align: center;
  margin-top: 20px;
}

</style>