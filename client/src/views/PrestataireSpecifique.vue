<template>
  <div class="prestataire-container">
    <h1>Prestataire</h1>
    <p>Voici la page dédiée aux prestataires.</p>
    <div v-if="prestataire" class="prestataire-details">
      <h2>{{ prestataire.societe }}</h2>
      <p class="adresse">{{ prestataire.adresse }}</p>
      <img
          :src="prestataire.logo"
          :alt="prestataire.societe"
          class="prestataire-logo"
      />
      <LivreDOr />
      <router-link :to="`/prestataire/${prestataire.id}/articles`" class="link-button">
        <button class="btn">Nos articles</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LivreDOr from "@/components/LivreDOr.vue";

export default {
  name: "PrestataireSpecifique",
  components: { LivreDOr },
  computed: {
    ...mapState("ProfilStore", ["prestataire"])
  },
  methods: {
    ...mapActions("ProfilStore", ["getPrestairebyId"])
  },
  mounted() {
    const prestaireId = parseInt(this.$route.params.id);
    this.getPrestairebyId(prestaireId);
  }
};
</script>

<!-- Style scoped pour les éléments internes -->
<style scoped>
:root {
  --primary-red: #c0392b;
  --dark-bg: #1a1a1a;
  --light-text: #ecf0f1;
  --secondary-text: #bdc3c7;
}

.prestataire-container {
  background-color: var(--dark-bg);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  color: var(--light-text);
  font-family: "Arial", sans-serif;
  margin: 2rem auto;
  max-width: 800px;
}

h1 {
  color: var(--primary-red);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

h2 {
  color: var(--primary-red);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: var(--secondary-text);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.adresse {
  font-style: italic;
}

.prestataire-logo {
  max-width: 100%;
  height: auto;
  border: 3px solid var(--primary-red);
  border-radius: 8px;
  margin: 1rem 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  background-color: var(--primary-red);
  color: var(--light-text);
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 1rem auto 0 auto;
}

.btn:hover {
  background-color: #e74c3c;
}

.link-button {
  text-decoration: none;
}
</style>

<!-- Style global pour le body -->
<style>
body {
  background-color: #1a1a1a;
  margin: 0;
  padding: 0;
}
</style>
