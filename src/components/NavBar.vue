<template>
  <div>
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
      <router-link to="/profil" @click="closeMenu">Créer profil</router-link>
      <router-link to="/concert-schedule" @click="closeMenu">Programmation des concerts</router-link>
      <router-link to="/planning" @click="closeMenu">Placer concert</router-link>
      <router-link to="/organisateur/validartiste" @click="closeMenu">Valider concert</router-link>
      <router-link to="/billet" @click="closeMenu">Tickets et abonnements</router-link>
    </div>
  </div>
</template>

<script>
import SelecteurLanguage from "@/components/SelecteurLanguage.vue";

export default {
  components: {
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
        document.body.style.overflow = 'auto';
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
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
  z-index: 200;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 150;
}
</style>