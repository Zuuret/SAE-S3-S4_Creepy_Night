<template>
  <div class="panier">
    <h1>{{ $t('panier.votrePanier') }}</h1>
    <div v-if="panier.length > 0" class="panier-items">
      <div v-for="item in panier" :key="item.id" class="panier-item">
        <img :src=getImageUrl(item.image) alt="Article" class="panier-item-image" />
        <div class="panier-item-info">
          <p>{{ item.nom }}</p>
          <p>{{ $t('panier.prix') }} : {{ item.prix }} €</p>
          <p>{{ $t('panier.quantite') }} : {{ item.quantite }}</p>
          <div class="quantity-controls">
            <button @click="diminuerQuantite(item)">-</button>
            <button @click="incrementerQuantite(item)" :disabled="item.stock <= 0">+</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="panier.length > 0" class="panier-total">
      <p>{{ $t('panier.total') }} : {{ total.toFixed(2) }} €</p>
      <button @click="reserverArticle(utilisateurConnecte.id)">{{ $t('panier.validerCommande') }}</button>
    </div>
    <p v-else>{{ $t('panier.panierVide') }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "PanierArticle",
  computed: {
    ...mapState('PrestataireStore', ['panier']),
    ...mapState('ProfilStore', ['utilisateurConnecte']),
    total() {
      return this.panier.reduce((total, item) => total + item.prix * item.quantite, 0);
    }
  },
  methods: {
    ...mapActions('PrestataireStore', ['incrementerQuantite', 'diminuerQuantite', 'reserverArticle', 'fetchPanier']),
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
  },
  async mounted() {
    await this.fetchPanier(this.utilisateurConnecte.id);
  }
}
</script>

<style scoped>
.panier {
  background: rgba(0, 0, 0, 0.85);
  border-radius: 15px;
  padding: 20px;
  width: 40%;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  color: #ffffff;
  font-family: Kanit, sans-serif;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

h1 {
  margin-top: 0;
  font-size: 30px;
  margin-bottom: 15px;
}

.panier-items {
  max-height: 1000px;
  overflow-y: auto;
  padding-right: 10px;
}

.panier-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  gap: 15px;
}

.panier-item-image {
  width: 150px;
  height: auto;
}

.panier-item-info {
  flex: 1;
  text-align: left;
  margin-left: 10px;
}

.panier-item-info p {
  margin: 1px;
  font-size: 18px;
}

.quantity-controls {
  display: flex;
  gap: 10px;
}

.quantity-controls button {
  margin-top: 5px;
  background: linear-gradient(to right, #e67e22, #d35400);
  color: white;
  border: none;
  padding: 8px 13px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.quantity-controls button:hover {
  background: linear-gradient(to right, #d35400, #c0392b);
  transform: translateY(-2px);
}

.panier-total {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #f39c12;
}

button {
  margin: 0;
  background: linear-gradient(to right, #27ae60, #219150);
  color: white;
  border: none;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

button:hover {
  background: linear-gradient(to right, #219150, #1e8449);
  transform: translateY(-2px);
}

button:disabled {
  background: #7f8c8d;
  cursor: not-allowed;
}

button:disabled:hover {
  background: #7f8c8d;
  transform: none;
}
</style>