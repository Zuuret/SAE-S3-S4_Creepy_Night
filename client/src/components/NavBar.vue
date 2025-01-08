<template>
  <div>
    <nav :class="{ 'navbar': true, 'hidden': isNavbarHidden }">
      <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo">
      <div class="selection-language">
        <SelecteurLanguage />
      </div>
      <img src="@/assets/menu-burger.png" alt="menu-burger" class="menu-burger" @click="toggleMenu">
    </nav>

    <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>

    <div v-if="isMenuOpen" class="burger-menu">
      <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo-burger">

      <div v-if="!utilisateurConnecte">
        <router-link to="/connexion" @click="closeMenu">Connexion</router-link>
        <router-link to="/creation-profil" @click="closeMenu">Créer profil</router-link>
      </div>

      <div v-else>
        <router-link to="/" @click.native="logout">Déconnexion</router-link>
        <router-link to="/profil" @click="closeMenu">Mon Profil</router-link>
      </div>

      <router-link to="/prestataire" @click="closeMenu">Nos prestataires</router-link>
      <router-link to="/secuflippe" @click="closeMenu">SecuFlippe</router-link>
      <router-link to="/cashless" @click="closeMenu">CashLess</router-link>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import SelecteurLanguage from "@/components/SelecteurLanguage.vue";

export default {
  components: {
    SelecteurLanguage,
  },
  data() {
    return {
      isMenuOpen: false,
      lastScrollY: 0,
      isNavbarHidden: false,
    };
  },
  computed: {
    ...mapState('ProfilStore', ['utilisateurConnecte']),
  },
  methods: {
    ...mapActions('ProfilStore', ['logoutUser']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    },
    handleScroll() {
      const currentScrollY = window.scrollY;
      this.isNavbarHidden = currentScrollY > this.lastScrollY && currentScrollY > 100;
      this.lastScrollY = currentScrollY;
    },
    logout() {
      this.logoutUser();
      this.closeMenu()
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    document.body.style.overflow = 'auto';
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
  padding: 10px;
  border-bottom: 1px solid white;
  z-index: 100;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}

.navbar.hidden {
  transform: translateY(-100%);
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