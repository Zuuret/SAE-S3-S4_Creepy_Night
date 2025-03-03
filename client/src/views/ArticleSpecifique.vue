<template>
  <div class="page-container">
    <NavBar/>
    <div class="article-container" v-if="article">
      <div class="content">
        <img :src="article.image" :alt="article.nom" class="article_image" />
        <div class="details">
          <h2 class="nom">{{ article.nom }}</h2>
          <div class="traitBlanc"></div>
          <h3 class="prix">{{ article.prix }} €</h3>
          <p class="description">{{ article.description }}</p>
          <h3 class="stock">Stock restant : {{ article.stock }}</h3>
          <div class="btn-container">
            <button @click="ajouterAuPanier()">🛒 Ajouter</button>
          </div>
        </div>
      </div>
    </div>
    <PanierArticle />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PanierArticle from "@/components/PanierArticle.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ArticleSpecifique',
  components: {NavBar, PanierArticle},
  computed: {
    ...mapState('PrestataireStore', ['article']),
  },
  methods: {
    ...mapActions('PrestataireStore', ['getArticleById','addArticlePanier']),
    ajouterAuPanier() {
      if (this.article.stock > 0) {
        const article = {
          ...this.article,
        };
        this.addArticlePanier(article);
        alert(`Article ajouté au panier`);
      } else {
        alert("Impossible d'ajouter au panier. Stock insuffisant.");
      }
    },
  },
  mounted() {
    const articleId = parseInt(this.$route.params.idArticle)
    this.getArticleById(articleId);
  }
}
</script>

<style scoped>
.page-container {
  background-color: #9f041c;
  height: 91.85vh;
  display: flex;
  font-family: Kanit, sans-serif;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  gap: 20px;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.article-container {
  box-sizing: border-box;
  background-color: #8e061b;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  padding: 70px;
  text-align: left;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.article_image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
}

.details {
  text-align: left;
  flex: 1;
  max-width: 350px;
  word-wrap: break-word;
}

.nom {
  margin: 0 0 5px 0;
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
}

.traitBlanc {
  border-top: 1px solid white;
  display: flex;
  justify-content: center;
  width: 100%;
}

.description {
  margin: 5px 0 0 0;
  font-size: 18px;
  color: #dcdcdc;
  line-height: 1.5;
}

.prix {
  margin: 5px 0 0 0;
  font-size: 25px;
  color: #ffffff;
}

.stock {
  margin: 5px 0 0 0;
  font-size: 20px;
  color: #ffffff;
}

.btn-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

button {
  background: linear-gradient(to right, #e67e22, #d35400);
  color: white;
  border: none;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  min-width: 120px;
}

button:hover {
  background: linear-gradient(to right, #d35400, #c0392b);
  transform: translateY(-2px);
}
</style>