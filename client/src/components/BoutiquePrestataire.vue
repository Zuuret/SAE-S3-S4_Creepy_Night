<template>
  <div class="boutique-container">
    <div class="filters">
      <h2>{{ $t('boutique.filtres') }}</h2>
      <div class="filter-group">
        <label for="filtreNom">{{ $t('boutique.nom') }}</label>
        <input type="text" v-model="filtreNom" id="filtreNom" :placeholder="$t('boutique.filtrerParNom')" />
      </div>
      <div class="filter-group">
        <label for="filtrePrixMin">{{ $t('boutique.prixMin') }}</label>
        <input type="number" v-model.number="filtrePrixMin" id="filtrePrixMin" :placeholder="$t('boutique.filtrerParPrixMin')" />
      </div>
      <div class="filter-group">
        <label for="filtrePrixMax">{{ $t('boutique.prixMax') }}</label>
        <input type="number" v-model.number="filtrePrixMax" id="filtrePrixMax" :placeholder="$t('boutique.filtrerParPrixMax')" />
      </div>
      <div class="filter-group">
        <label for="filtreStock">{{ $t('boutique.enStock') }}</label>
        <input type="checkbox" v-model="filtreStock" id="filtreStock"/>
      </div>
      <button @click="reinitialiseFiltres">{{ $t('boutique.reinitialiserFiltres') }}</button>
    </div>

    <div class="articles-container">
      <h1>{{ $t('boutique.notreBoutique') }}</h1>
      <div class="prestataires-list">
        <div v-if="filteredArticles.length === 0" class="no-articles">
          <p>{{ $t('boutique.aucunArticleDisponible') }}</p>
        </div>
        <div v-else class="article" v-for="article in filteredArticles" :key="article.id">
          <router-link :to="`articles/${article.id}`">
            <div class="article-item">
              <img :src="getImageUrl(article.image)" :alt="article.nom" class="article_image" />
              <div class="prestataire-details">
                <h3>{{ article.nom }}</h3>
                <p>{{ article.prix }} €</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PrestataireArticle",
  data() {
    return {
      filtrePrixMin: null,
      filtrePrixMax: null,
      filtreNom: "",
      filtreStock: false,
    };
  },
  computed: {
    ...mapState("PrestataireStore", ["articlesId"]),

    filteredArticles() {
      return this.articlesId.filter((article) => {
        const matchPrixMin = this.filtrePrixMin === null || article.prix >= this.filtrePrixMin;
        const matchPrixMax = this.filtrePrixMax === null || article.prix <= this.filtrePrixMax;
        const matchNom = this.filtreNom === "" || article.nom.toLowerCase().includes(this.filtreNom.toLowerCase());
        const matchStock = this.filtreStock === false || article.stock > 0;

        return matchPrixMin && matchPrixMax && matchNom && matchStock;
      });
    },
  },
  methods: {
    ...mapActions("PrestataireStore", ["getAllArticlesById"]),
    reinitialiseFiltres() {
      this.filtrePrixMin = null;
      this.filtrePrixMax = null;
      this.filtreNom = "";
      this.filtreStock = false;
    },
    getImageUrl(image) {
      return require(`../assets/${image}`);
    },
  },
  async mounted() {
    const prestataireId = this.$route.params.id;
    await this.getAllArticlesById(prestataireId);
  },
};
</script>

<style scoped>
.boutique-container {
  display: flex;
  gap: 30px;
  padding: 30px;
  background-color: #000000;
}

.filters {
  margin-top: 4.8%;
  width: 200px;
  min-width: 200px;
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: Kanit, sans-serif;
  overflow: hidden;
}

.filters h2 {
  margin: 0;
  text-align: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filters label {
  font-weight: bold;
}

.filters input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #333;
  color: white;
}

button {
  background-color: #9f041c;
  margin-top: 5px;
  color: white;
  font-family: Kanit, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
}

button:hover {
  background-color: #c90626;
  transform: scale(1.05);
}
.articles-container {
  flex-grow: 1;
}
h1 {
  margin-top : 0;
  color: white;
  font-family: Kanit, sans-serif;
  text-align: center;
}

.prestataires-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.no-articles {
  text-align: center;
  color: #555;
  font-size: 45px;
  margin-top: 100px;
  font-family: Kanit, sans-serif;
}

.article {
  width: 200px;
  text-align: center;
  background-color: #9f041c;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.22);
  transition: transform 0.2s ease-in-out;
}

.article:hover {
  transform: scale(1.05);
}

.article-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article_image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.prestataire-details h3 {
  font-family: Kanit, sans-serif;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #000000;
  font-weight: bold;
}

.prestataire-details p {
  color: white;
  font-size: 17px;
  font-family: Kanit, sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
