<template>
  <body>
  <nav v-if="!isMenuOpen" class="navbar">
    <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo">
    <div class="selection-language">
      <SelecteurLanguage />
    </div>
    <img src="@/assets/menu-burger.png" alt="menu-burger" class="menu-burger" @click="toggleMenu">
  </nav>

  <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>

  <div v-if="isMenuOpen" class="burger-menu">
    <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo-burger">
    <router-link to="/profil" @click.native="closeMenu">Créer profil</router-link>
    <router-link to="/concert" @click.native="closeMenu">Réserver un concert</router-link>
    <router-link to="/concert-schedule" @click.native="closeMenu">Programmation des concerts</router-link>
    <router-link to="/planning" @click.native="closeMenu">Placer concert</router-link>
    <router-link to="/organisateur/validartiste" @click.native="closeMenu">Valider concert</router-link>
    <router-link to="/estebanGay" @click.native="closeMenu">Esteban = GAY</router-link>
  </div>

  <div class="accueil">
    <img src="@/assets/fond_Accueil.png" alt="CreepyNight_accueil" class="accueil_image">
    <div class="compte-rebours">
      <CompteRebours />
    </div>
  </div>
  </body>
</template>

<script>
import CompteRebours from '@/components/CompteRebours.vue';
import SelecteurLanguage from "@/components/SelecteurLanguage.vue";

export default {
  components: {
    CompteRebours,
    SelecteurLanguage,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = ''; // Réactiver le défilement
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

body, html {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid white;
  z-index: 100;
}

.navbar .logo {
  width: 20%;
  cursor: pointer;
}

.navbar .selection-language {
  position: absolute;
  right: 15%;
}

.navbar .menu-burger {
  position: absolute;
  margin-top: -5px;
  width: 4%;
  cursor: pointer;
  right: 5%;
}

/* Augmenter le z-index pour le menu burger */
.burger-menu {
  position: fixed;
  background-color: black;
  color: white;
  padding: 10px;
  width: 650px;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 200; /* Plus élevé que l'overlay */
}

.burger-menu .logo-burger {
  width: 35%;
  margin-top: 15px;
  margin-left: 15px;
}

.burger-menu a {
  margin-top: 60px;
  color: white;
  margin-left: 15%;
  font-family: 'Creepster', cursive;
  transition: 0.3s;
  font-size: 40px;
}

.burger-menu a:hover {
  font-size: 45px;
  transition: 0.3s;
}

/* Overlay avec un z-index moins élevé */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 150; /* Moins élevé que le burger-menu */
}

.accueil {
  margin-top: 70px;
  width: 100vw;
  overflow: hidden;
}

.accueil .accueil_image {
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
</style>
