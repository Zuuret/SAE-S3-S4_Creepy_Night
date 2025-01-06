<template>
  <div class="prestataires-list">
    <div v-if="articles.length === 0" class="no-articles">
      <p>Aucun articles disponible.</p>
    </div>
    <div v-else class="article" v-for="article in articles" :key="article.id">
      <router-link :to="`articles/${article.id}`">
        <div class="article-item">
          <img :src="article.image" :alt="article.image" class="article_image" />
          <div class="prestataire-details">
            <h3>{{ article.nom }}</h3>
            <h3>{{ article.prix }}</h3>
            <h3>Stock : {{ article.stock }}</h3>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name:'PrestataireArticle',
  computed: {
    ...mapState('PrestataireStore',['articles']),
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
/* Conteneur principal pour la liste des prestataires */
.prestataires-list {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

/* Message lorsqu'il n'y a pas d'articles */
.no-articles {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
  margin-top: 50px;
}

/* Chaque article de la liste */
.article {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Contenu de l'article (image et détails) */
.article-item {
  display: flex;
  align-items: center;
  width: 100%;
}

.article_image {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

/* Détails de l'article */
.prestataire-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.prestataire-details h3 {
  margin: 5px 0;
  font-size: 1.1rem;
  color: #333;
}

/* Gestion de l'affichage du prix et du stock */
.prestataire-details h3:nth-child(2) {
  color: #e67e22; /* Couleur du prix */
}

.prestataire-details h3:nth-child(3) {
  color: #16a085; /* Couleur du stock */
}

/* Gestion du survol de l'article */
.article-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

/* Ajustements généraux */
h3 {
  font-weight: normal;
}

</style>