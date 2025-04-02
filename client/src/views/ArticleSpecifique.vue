<template>
  <div class="page-container">
    <NavBar/>
    <div class="article-container" v-if="article">
      <div class="content">
        <img :src=getImageUrl(article.image) :alt="article.nom" class="article_image" />
        <div class="details">
          <h2 class="nom">{{ article.nom }}</h2>
          <div class="traitBlanc"></div>
          <h3 class="prix">{{ article.prix }} €</h3>
          <p class="description">{{ article.description }}</p>
          <h3 class="stock">{{ $t('article.stockRestant') }} : {{ article.stock }}</h3>
          <div class="btn-container">
            <button @click="ajouterAuPanier()" :disabled="article.stock <= 0">🛒 {{ $t('article.ajouter') }}</button>
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
    ...mapState('ProfilStore',['utilisateurConnecte']),
  },
  methods: {
    ...mapActions('PrestataireStore', ['getArticleById','addArticlePanier']),
    ajouterAuPanier() {
      if (this.article.stock > 0) {
        const article = {
          ...this.article,
          utilisateur_id: this.utilisateurConnecte.id,
        };
        this.addArticlePanier(article);
        alert(`Article ajouté au panier`);
      } else {
        alert("Impossible d'ajouter au panier. Stock insuffisant.");
      }
    },
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
  },
  async mounted() {
    const articleId = parseInt(this.$route.params.idArticle)
    await this.getArticleById(articleId);
  }
}
</script>

<style scoped>
.page-container {
  background-color: #9f041c;
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}

.article-container {
  background-color: #8e061b;
  flex: 2;
  padding: 20px 30px;
  border-radius: 10px;
  box-sizing: border-box;
  max-height: 80vh;
  overflow-y: auto;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.article_image {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.details {
  flex: 1;
  text-align: left;
  color: #ffffff;
}

.nom {
  margin: 0 0 5px 0;
  font-size: 35px;
  font-weight: bold;
}

.traitBlanc {
  border-top: 1px solid white;
  margin: 10px 0;
}

.prix {
  font-size: 25px;
  color: #ffffff;
  margin-top: 10px;
}

.description {
  margin-top: 10px;
  font-size: 18px;
  color: #dcdcdc;
  line-height: 1.5;
}

.stock {
  margin-top: 10px;
  font-size: 20px;
  color: #ffffff;
}

.btn-container {
  margin-top: 20px;
}

.btn-container button {
  background: linear-gradient(to right, #e67e22, #d35400);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  min-width: 120px;
}

.btn-container button:hover {
  background: linear-gradient(to right, #d35400, #c0392b);
  transform: translateY(-2px);
}

.btn-container button:disabled {
  background: #dcdcdc;
  color: #8c8c8c;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
    padding-top: 80px;
  }
  .article-container {
    max-width: 100%;
    width: 100%;
  }
}
</style>