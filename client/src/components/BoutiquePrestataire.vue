<template>
  <div>
    <h1>Notre Boutique</h1>
    <div class="prestataires-list">
      <div v-if="articlesId.length === 0" class="no-articles">
        <p>Aucun articles disponible.</p>
      </div>
      <div v-else class="article" v-for="article in articlesId" :key="article.id">
        <router-link :to="`articles/${article.id}`">
          <div class="article-item">
            <img :src="article.image" :alt="article.image" class="article_image" />
            <div class="prestataire-details">
              <h3>{{ article.nom }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name:'PrestataireArticle',
  computed: {
    ...mapState('PrestataireStore',['articlesId']),
    ...mapState('ProfilStore',['prestataire'])
  },
  methods: {
    ...mapActions('PrestataireStore',['getAllArticlesById'])
  },
  mounted() {
    const prestataireId = parseInt(this.$route.params.id);
    this.getAllArticlesById(prestataireId);
  }
}

</script>

<style scoped>
h1 {
  color: white;
  font-family: Kanit, sans-serif;
}

.prestataires-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #000000;
}

.no-articles {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
  margin-top: 50px;
}

.article {
  width: 200px;
  text-align: center;
  background-color: #9f041c;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 7px 7px 5px rgba(255, 255, 255, 0.22);
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

a {
  text-decoration: none;
  color: inherit;
}
</style>

