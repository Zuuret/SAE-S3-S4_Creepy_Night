<template>
  <div class="prestataires-container">
    <h1 class="titre-section">{{ $t('prestataires.nosPrestataires') }}</h1>

    <div class="search-sort">
      <input v-model="searchQuery" :placeholder="$t('prestataires.rechercher')" class="search-input"/>

      <select v-model="sortOption" class="sort-select">
        <option value="name">{{ $t('prestataires.trierParNom') }}</option>
        <option value="categorie">{{ $t('prestataires.trierParCategorie') }}</option>
      </select>
    </div>

    <div v-if="sortOption === 'categorie'" class="category-filters">
      <label v-for="categorie in uniqueCategories" :key="categorie" class="category-label">
        <input type="checkbox" :value="categorie" v-model="selectedCategories" class="category-checkbox"/>
        {{ categorie }}
      </label>
    </div>

    <div v-if="filteredPrestataires.length > 0" class="prestataire-list">
      <div v-for="prestataire in filteredPrestataires" :key="prestataire.id" class="prestataire-card">
        <img :src="getImageUrl(prestataire.logo)" alt="Logo" class="prestataire-logo"/>
        <h3 class="prestataire-nom">{{ prestataire.societe }}</h3>
        <p class="prestataire-description">{{ prestataire[`description_${$i18n.locale}`] || prestataire.description_fr }}</p>

        <router-link :to="'/prestataire/' + prestataire.id" class="btn-details">{{ $t('prestataires.voirProfil') }}</router-link>
      </div>
    </div>
    <p v-else class="no-result">{{ $t('prestataires.aucunResultat') }}</p>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      sortOption: "name",
      selectedCategories: [],
    };
  },
  methods: {
    ...mapActions("profil", ["fetchPrestataires"]),
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
  },
  watch: {
  '$i18n.locale': async function (nouvelleLangue) {
    console.log("Langue changée :", nouvelleLangue);
    
    // Assurez-vous de changer la langue dans Vuex et Vue I18n
    await this.$store.dispatch('i18n/changeLocale', nouvelleLangue);
    
    // Rafraîchissement des prestataires après changement de langue
    await this.fetchPrestataires();
    
    // Rafraîchir d'autres données si nécessaire
    // await this.$store.dispatch('texte_accueil/fetchTexteAccueil');
  }
}

,
  computed: {
    ...mapState("profil", ["prestataires"]),
    uniqueCategories() {
      return [...new Set(this.prestataires.map(p => p.theme))];
    },
    filteredPrestataires() {
      let result = this.prestataires;
      if (this.searchQuery) {
        result = result.filter(prestataire =>
            prestataire.societe.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.sortOption === "categorie" && this.selectedCategories.length > 0) {
        result = result.filter(prestataire => this.selectedCategories.includes(prestataire.theme));
      }
      if (this.sortOption === "name") {
        result.sort((a, b) => a.societe.localeCompare(b.societe));
      }
      return result;
    }
  },
  mounted() {
    console.log('rootState.i18n dans mounted:', this.$store.state.i18n);
    this.fetchPrestataires();
  }
};
</script>

<style scoped>
.prestataires-container {
  padding: 20px;
  text-align: center;
  background-color: #111;
  color: white;
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3);
}

.titre-section {
  font-size: 2.5em;
  font-family: 'Creepster', cursive;
  color: #e74c3c;
  margin-bottom: 20px;
}

.search-sort {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input, .sort-select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: black;
  color: white;
  font-size: 1em;
  border: #ffffff 1px solid;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.category-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #e74c3c;
  font-size: 1.1em;
}

.prestataire-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.prestataire-card {
  width: 280px;
  padding: 15px;
  border-radius: 10px;
  background: black;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
  text-align: center;
  transition: transform 0.3s;
}

.prestataire-card:hover {
  transform: scale(1.05);
}

.prestataire-logo {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.prestataire-nom {
  font-size: 1.4em;
  color: #e74c3c;
}

.prestataire-description {
  font-size: 1em;
  color: white;
  opacity: 0.8;
}

.btn-details {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.btn-details:hover {
  background-color: #c0392b;
}

.no-result {
  color: #e74c3c;
  font-size: 1.2em;
  margin-top: 20px;
}
</style>
