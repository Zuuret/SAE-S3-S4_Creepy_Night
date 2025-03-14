<template>
  <div>
    <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>

    <div v-if="isMenuOpen" class="burger-menu">
      <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo-burger">

      <div v-if="!utilisateurConnecte" class="user-links">
        <router-link to="/connexion" @click="closeMenu">Connexion</router-link>
        <router-link to="/creation-profil" @click="closeMenu">Créer profil</router-link>
      </div>

      <div v-else class="user-links">
        <router-link to="/" @click.native="logout">Déconnexion</router-link>
        <router-link to="/profil" @click="closeMenu">Mon Profil</router-link>
      </div>

      <router-link to="/prestataire" @click="closeMenu">Nos prestataires</router-link>
      <router-link to="/reservations" @click="closeMenu">Mes réservations</router-link>
      <router-link to="/secuflippe" @click="closeMenu">SecuFlippe</router-link>
      <router-link to="/cashless" @click="closeMenu">CashLess</router-link>
    </div>

    <nav :class="{ 'navbar': true, 'hidden': isNavbarHidden }">
        <img src="@/assets/creepy_night_logo.png" alt="Logo" class="logo" style="width: 20%; cursor: pointer;">
        <router-link to="/" class="logo-overlay" @click.stop></router-link>

      <div class="selection-language">
        <SelecteurLanguage />
      </div>
      <img src="@/assets/menu-burger.png" alt="menu-burger" class="menu-burger" @click="toggleMenu">
    </nav>
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
.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
  display: block;
}
.menu-burger {
  position: relative;
  z-index: 20;
}

.selection-language {
  position: relative;
  z-index: 20;
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
  right: 8%;
}

.navbar .menu-burger {
  position: absolute;
  margin-top: -5px;
  width: 4%;
  cursor: pointer;
  left: 3%;  /* right si logo a mettre à droite */
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
  margin-right: 15px;
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

@media (max-width: 1024px) {
  .navbar .logo {
    width: 30%;
  }

  .navbar .menu-burger {
    width: 6%;
  }

  .burger-menu {
    width: 100%;
    max-width: 400px;
  }

  .burger-menu .logo-burger {
    width: 50%;
  }

  .burger-menu a {
    font-size: 30px;
  }

  .burger-menu a:hover {
    font-size: 35px;
  }
}

@media (max-width: 768px) {
  .navbar .logo {
    width: 40%;
  }

  .navbar .menu-burger {
    width: 8%;
  }

  .burger-menu {
    max-width: 300px;
  }

  .burger-menu .logo-burger {
    width: 60%;
  }

  .burger-menu a {
    font-size: 25px;
    margin-top: 40px;
  }

  .burger-menu a:hover {
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .navbar .logo {
    width: 35%;
  }

  .navbar .menu-burger {
    width: 10%;
  }

  .burger-menu {
    max-width: 250px;
  }

  .burger-menu .logo-burger {
    width: 70%;
  }

  .user-links {
    display: flex;
    flex-direction: column;
    gap: 0px;
  }

  .burger-menu a {
    font-size: 25px;
    margin-top: 40px;
  }

  .burger-menu a:hover {
    font-size: 30px;
  }
}
</style>