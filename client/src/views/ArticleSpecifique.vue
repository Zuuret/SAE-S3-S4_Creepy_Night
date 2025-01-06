<template>
  <div v-if="article">
    <img :src="article.image" :alt="article.image" class="article_image" />
    <div class="prestataire-details">
      <h3>{{ article.nom }}</h3>
      <p>{{ article.description }}</p>
      <h3>{{ article.prix }}</h3>
      <h3>Stock : {{ article.stock }}</h3>
    </div>
    <button @click="ajouterAuPanier()">Ajouter au panier</button>
    <PanierArticle/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PanierArticle from "@/components/PanierArticle.vue";

export default {
  name: 'ArticleSpecifique',
  components: {PanierArticle},
  computed: {
    ...mapState('PrestataireStore', ['article'])
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


/* Image de l'article */
.article_image {
  width: 100%;
  max-width: 400px; /* Limiter la largeur de l'image */
  height: auto;
  border-radius: 8px;
  object-fit: cover; /* Conserver le ratio d'aspect sans distorsion */
  margin-bottom: 20px;
  display: block; /* Centrer l'image en tant qu'élément bloc */
  margin-left: auto; /* Centrer horizontalement */
  margin-right: auto;
}

/* Détails du prestataire (nom, description, prix, stock) */
.prestataire-details {
  text-align: center;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Nom de l'article */
.prestataire-details h3 {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #2c3e50;
  font-weight: bold;
}

/* Description de l'article */
.prestataire-details p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #7f8c8d;
  line-height: 1.5;
}

/* Prix de l'article */
.prestataire-details h3:nth-child(2) {
  font-size: 1.4rem;
  color: #e67e22; /* Couleur du prix */
  margin-bottom: 10px;
}

/* Stock de l'article */
.prestataire-details h3:nth-child(3) {
  font-size: 1.2rem;
  color: #16a085; /* Couleur pour le stock */
}


</style>
