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
      <button class="scroll-down-button" @click="scrollDown">
        <img src="@/assets/scrolldown.png" alt="Descendre" class="scroll-icon">
      </button>
      <div class="PubSection">
        <div v-if="afficherPubPrestataire">
          <PubPrestataire />
        </div>
        <div v-else>
          <PubClient />
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
            <router-link
                :to="activite.titre === 'Cinépeur' ? '/cinepeur' :
                    activite.titre === 'Concerts' ? '/concert' :
                    activite.titre === 'Bal’trouille' ? '/baltrouille' :
                    activite.titre === 'Expositions' ? '/expo' :
                    `/${activite.titre.toLowerCase().replace(/\s+/g, '')}`"
                class="btn-activite">Voir l'activité</router-link>
          </div>
        </div>
      </div>
      <div class="carte">
        <h1 class="titre-carte">Découvrez dès maintenant le plan de votre festival Creepynight !</h1>
        <div class="carte-interactive">
          <CarteInteractive />
        </div>
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
import PubClient from "@/components/PubClient.vue";
import PubPrestataire from "@/components/PubPrestataire.vue";

import cariHorreurImg from "@/assets/carihorreur.jpg";
import cauchemarathonImg from "@/assets/cauchemarathon.jpg";
import cinepeurImg from "@/assets/cinepeur.jpg";
import concertsImg from "@/assets/concert.jpg";
import balTrouilleImg from "@/assets/baltrouille.jpg";
import expoImg from "@/assets/expo.jpg";
import CarteInteractive from './CarteInteractive.vue';

export default {
  components: {
    CompteRebours,
    NavBar,
    PubClient,
    CarteInteractive,
    PubPrestataire
  },
  data() {
    return {
      utilisateurConnecte: null,
      afficherPubPrestataire: this.calculerAffichage(),
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
  methods: { scrollDown() {
      window.scrollBy({
        top: window.innerHeight * 0.5, // Descend de 50% de la hauteur de l'écran
        left: 0,
        behavior: "smooth"
      });
    },
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "utilisateur";
    },

    calculerAffichage() {
      const dateFestival = new Date("2024-10-27");
      const dateActuelle = new Date();
      const differenceMois = (dateFestival.getFullYear() - dateActuelle.getFullYear()) * 12 + (dateFestival.getMonth() - dateActuelle.getMonth());
      const dateSeuil = new Date("2024-10-02");
      return differenceMois > 4 || dateActuelle >= dateSeuil;
    }
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
  left: 51%;
  transform: translate(-50%, -50%);
}

.activites {
  padding-top: 20px;
  text-align: center;
  background-color: black;
  color: white;
  height: 100vh;
}

#titre-activite {
  color: white;
}

.titre-activites {
  font-family: 'Creepster', cursive;
  font-size: 200%;
}

.description-activite {
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
  background-color: rgba(0, 0, 0, 0.5);
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
  position: relative;
  opacity: 1;
}

.lamelle::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.lamelle h2, .lamelle p {
  position: relative;
  z-index: 2;
}

.lamelle:hover {
  width: 25%;
  opacity: 1;
}

.lamelle h3 {
  margin: 0;
}

.lamelle:hover h2 {
  top: 25%;
  transform: translate(-50%, -50%) rotate(0deg);
}

.lamelle p {
  opacity: 0;
  margin-top: 10px;
  transition: opacity 0.3s ease;
  font-size: 150%;
}

.lamelle h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  white-space: nowrap;
  transition: transform 0.3s ease, top 0.3s ease;
}

.lamelle:hover p {
  opacity: 1;
}

.btn-activite {
  display: none;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #AD0918;
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;
  z-index: 2;
}

.btn-activite:hover {
  background-color: #8A0714;
  transform: scale(1.05);
}

.btn-activite:active {
  transform: scale(0.95);
}

.lamelle:hover .btn-activite {
  display: inline-block;
}

.titre-partie {
  padding-top: 50px;
  margin-bottom: 50px;
  font-family: 'Creepster', cursive;
  color: white;
  font-size: 300%;
}

.pourquoi-venir {
  padding-top: 20px;
  text-align: center;
  background-color: #AD0918;
  color: white;
  height: 100vh;
}

#titre-pourquoi-venir {
  margin-bottom: 11%;
}

.puce {
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

.titre-carte {
  font-family: 'Creepster', cursive;
  font-size: 300%;
  text-align: center;
  padding-top: 50px;
  color: white;
  padding: 50px;
}

.carte {
  background-color: #AD0918;
  padding-bottom: 50px;
}

@media (max-width: 768px) {
  .accueil .accueil_image {
    margin-top: 10%;
  }

  .compte-rebours {
    width: 80%;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .activites {
    height: auto;
  }

  .lamelles-container {
    flex-direction: column;
    gap: 5px;
  }

  .lamelle {
    width: 80%;
    height: 200px;
    margin-bottom: 20px;
  }

  .lamelle:hover {
    width: 90%;
  }

  .titre-partie, .titre-carte {
    font-size: 200%;
    padding-top: 20px;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .reste-connectes, .contact-info {
    text-align: center;
  }

  .social-links a {
    display: block;
    margin: 10px 0;
  }

  .carte-interactive {
    padding: 20px;
  }

  .lamelle h2 {
    font-size: 125%;
    transform: translate(-50%, -50%) rotate(0deg);
  }

  .lamelle:hover h2 {
    top: 15%;
    transform: translate(-50%, -50%) rotate(0deg);
  }

  .description-activite {
    padding: 10px;
  }

  .lamelle p {
    font-size: 100%;
    margin-top: 35px;
  }

  .btn-activite {
    margin-top: 0;
  }

  .footer {
    padding: 20px 10px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
  }

  .reste-connectes, .contact-info {
    text-align: center;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .activites {
    height: auto;
  }

  .lamelles-container {
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .lamelle {
    width: 45%;
    height: 300px;
    margin-bottom: 20px;
  }

  .lamelle:hover {
    width: 50%;
  }

  .titre-partie, .titre-carte {
    font-size: 250%;
    padding-top: 30px;
  }

  .compte-rebours {
    top: 35%;
  }

  .lamelle h2 {
    font-size: 175%;
    transform: translate(-50%, -50%) rotate(90deg);
  }

  .lamelle:hover h2 {
    top: 18%;
    transform: translate(-50%, -50%) rotate(0deg);
  }

  .lamelle p {
    font-size: 120%;
    margin-top: 30px;
  }

  .footer {
    padding: 30px 20px;
  }
}

@media (min-width: 1025px) {
  .lamelles-container {
    flex-direction: row;
    gap: 2px;
  }

  .lamelle {
    width: 8%;
    height: 70vh;
  }

  .lamelle:hover {
    width: 25%;
  }

  .titre-partie, .titre-carte {
    font-size: 300%;
    padding-top: 50px;
  }

  .lamelle h2 {
    font-size: 200%;
  }

  .lamelle p {
    font-size: 150%;
  }

  .compte-rebours {
    top: 60%;
  }

  .footer {
    padding: 40px 20px;
  }
}

.scroll-down-button {
  position: fixed;
  bottom: 30px;
  right: 20px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0;
  overflow: hidden;
}

.scroll-down-button:hover .scroll-icon {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.scroll-icon {
  width: 50%;
  height: 100%;
  object-fit: cover;
}


</style>