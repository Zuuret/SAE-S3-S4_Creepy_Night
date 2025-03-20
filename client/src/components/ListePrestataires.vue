<template>
  <div class="prestataires-container">
    <h1 class="titre-section">Découvrez nos Prestataires</h1>

    <div class="search-sort">
      <input v-model="searchQuery" placeholder="Rechercher un prestataire..." class="search-input"/>

      <select v-model="sortOption" class="sort-select">
        <option value="name">Trier par Nom</option>
        <option value="popularite">Trier par Popularité</option>
      </select>
    </div>

    <div v-if="filteredPrestataires.length > 0" class="prestataire-list">
      <div v-for="prestataire in filteredPrestataires" :key="prestataire.id" class="prestataire-card">
        <img :src="prestataire.logo || 'default-logo.png'" alt="Logo" class="prestataire-logo"/>
        <h3>{{ prestataire.societe }}</h3>
        <p>{{ prestataire.description }}</p>
        <router-link :to="'/prestataire/' + prestataire.id" class="btn-details">Voir Profil</router-link>
      </div>
    </div>
    <p v-else>Aucun prestataire ne correspond à votre recherche.</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      sortOption: "name",
    };
  },
  computed: {
    ...mapState("profil", ["prestataires"]),

    filteredPrestataires() {
      let result = this.prestataires;

      if (this.searchQuery) {
        result = result.filter(prestataire =>
            prestataire.societe.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.sortOption === "name") {
        result.sort((a, b) => a.societe.localeCompare(b.societe));
      } else if (this.sortOption === "popularite") {
        result.sort((a, b) => (b.popularite || 0) - (a.popularite || 0));
      }

      return result;
    }
  },
  mounted() {
    //this.$store.dispatch("profil/getAllPrestataire");
    this.$store.dispatch("profil/getAllPrestataireFromAPI");
  }
};
</script>

<style scoped>
.prestataires-container {
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.search-sort {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.sort-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.prestataire-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.prestataire-card {
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
  text-align: center;
}

.prestataire-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.btn-details {
  display: block;
  margin-top: 10px;
  padding: 8px;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn-details:hover {
  background-color: #c0392b;
}
</style>
