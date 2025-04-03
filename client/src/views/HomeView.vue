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
        <img src="@/assets/scrolldown.png" :alt="$t('scrollDown')" class="scroll-icon">
      </button>
      <div class="PubSection" id="texte-accueil" v-if="texteAccueil.titre || texteAccueil.contenu">
        <div class="texte-accueil-container">
          <h1 class="texte-accueil-titre">{{ texteAccueil.titre }}</h1>
          <div class="texte-accueil-contenu" v-html="texteAccueil.contenu"></div>
          <router-link to="/billet" class="btn-billet">{{ $t('buyTickets') }}</router-link>
        </div>
      </div>
    <div class="texte-accueil-container">
        <h1 class="texte-accueil-titre">{{ texteAccueil.titre }}</h1>
        <div class="texte-accueil-contenu" v-html="texteAccueil.contenu"></div>
    </div>
      <div class="activites">
        <h1 class="titre-partie" id="titre-activite">{{ $t('terrifyingFlexibleProgram') }}</h1>
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
                class="btn-activite">{{ $t('viewActivity') }}</router-link>
          </div>
        </div>
      </div>
      <div class="carte">
        <h1 class="titre-carte">{{ $t('discoverFestivalMap') }}</h1>
        <div class="carte-interactive">
          <CarteInteractive />
        </div>
      </div>
    </div>
    <div class="prestataires-list">
      <ListePrestataires />
    </div>
    <footer class="footer">
      <div class="footer-content">
        <div class="reste-connectes">
          <h2>{{ $t('stayConnected') }}</h2>
          <p>{{ $t('stayConnectedText') }}</p>
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank">Facebook</a> |
            <a href="https://www.instagram.com" target="_blank">Instagram</a> |
            <a href="https://www.twitter.com" target="_blank">Twitter</a>
          </div>
        </div>
        <div class="contact-info">
          <p>{{ $t('festivalSlogan') }}</p>
          <p>{{ $t('joinUs') }}</p>
          <p>{{ $t('sendEmail') }} <a href="mailto:pasencore@choisit.com">pasencore@choisit.com</a></p>
        </div>
      </div>
    </footer>
  </div>
  
</template>

<script>
import CompteRebours from '@/components/CompteRebours.vue';
import NavBar from "@/components/NavBar.vue";
import ListePrestataires from "@/components/ListePrestataires.vue";

import cariHorreurImg from "@/assets/carihorreur.jpg";
import cauchemarathonImg from "@/assets/cauchemarathon.jpg";
import cinepeurImg from "@/assets/cinepeur.jpg";
import concertsImg from "@/assets/concert.jpg";
import balTrouilleImg from "@/assets/baltrouille.jpg";
import expoImg from "@/assets/expo.jpg";
import CarteInteractive from './CarteInteractive.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    CompteRebours,
    NavBar,
    CarteInteractive,
    ListePrestataires
  },
  data() {
    return {
      utilisateurConnecte: null,
      afficherPubPrestataire: this.calculerAffichage(),
      activites: [
  {
    titre: this.$t("activites.carihorreur.titre"),
    description: this.$t("activites.carihorreur.description"),
    image: cariHorreurImg,
  },
  {
    titre: this.$t("activites.cauchemarathon.titre"),
    description: this.$t("activites.cauchemarathon.description"),
    image: cauchemarathonImg,
  },
  {
    titre: this.$t("activites.cinepeur.titre"),
    description: this.$t("activites.cinepeur.description"),
    image: cinepeurImg,
  },
  {
    titre: this.$t("activites.concerts.titre"),
    description: this.$t("activites.concerts.description"),
    image: concertsImg,
  },
  {
    titre: this.$t("activites.baltrouille.titre"),
    description: this.$t("activites.baltrouille.description"),
    image: balTrouilleImg,
  },
  {
    titre: this.$t("activites.expositions.titre"),
    description: this.$t("activites.expositions.description"),
    image: expoImg,
  },
]
,
    };
  },
  computed: {
    ...mapGetters('texte_accueil', ['titreAccueil', 'contenuAccueil']),
    texteAccueil() {
        return {
            titre: this.titreAccueil,
            contenu: this.contenuAccueil
      };
    }
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
    },
    updateActivites() {
    this.activites = [
      {
        titre: this.$t("activites.carihorreur.titre"),
        description: this.$t("activites.carihorreur.description"),
        image: cariHorreurImg,
      },
      {
        titre: this.$t("activites.cauchemarathon.titre"),
        description: this.$t("activites.cauchemarathon.description"),
        image: cauchemarathonImg,
      },
      {
        titre: this.$t("activites.cinepeur.titre"),
        description: this.$t("activites.cinepeur.description"),
        image: cinepeurImg,
      },
      {
        titre: this.$t("activites.concerts.titre"),
        description: this.$t("activites.concerts.description"),
        image: concertsImg,
      },
      {
        titre: this.$t("activites.baltrouille.titre"),
        description: this.$t("activites.baltrouille.description"),
        image: balTrouilleImg,
      },
      {
        titre: this.$t("activites.expositions.titre"),
        description: this.$t("activites.expositions.description"),
        image: expoImg,
      },
    ];
  },
  },
  watch: {
  '$i18n.locale': async function (nouvelleLangue) {
    console.log("Langue changée :", nouvelleLangue);
    await this.$store.dispatch('texte_accueil/fetchTexteAccueil'); // Rafraîchissement explicite
    this.updateActivites();
  }
},
  mounted() {
    const utilisateur = localStorage.getItem('utilisateurConnecte');
    if (utilisateur) {
      this.utilisateurConnecte = JSON.parse(utilisateur);
    }
    console.log('Le composant est monté');
    this.$store.dispatch('texte_accueil/fetchTexteAccueil');
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

.PubSection {
  height: 100vh;
  width: 100%;
  background-color: #AD0918;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-margin-top: 100px;
}

.texte-accueil-container {
  max-width: 1000px;
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}

.texte-accueil-titre {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #2c3e50;
}

.texte-accueil-contenu {
  font-size: 1.2em;
  color: #333;
  line-height: 1.6;
}

.btn-billet {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #AD0918;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-billet:hover {
  background-color: #8A0714;
  transform: scale(1.05);
}

.btn-billet:active {
  transform: scale(0.95);
}

</style>