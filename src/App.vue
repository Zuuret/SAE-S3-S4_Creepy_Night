<template>
  <div id="app">
    <nav>
      <CompteRebours />
      <router-link to="/about">Créer profil</router-link>
    </nav>
    <router-link to="/planning">Placer concert</router-link>
    <router-view/>
  </div>

</template>

<script>
import CompteRebours from './components/CompteRebours.vue';

export default {
  components: {
    CompteRebours,
  },
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
