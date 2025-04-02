<template>
  <div class="panier">
    <h1>{{ $t('panier.votrePanier') }}</h1>
    <div v-if="panier.length > 0">
      <div v-for="item in panier" :key="item.id_costume + item.taille" class="panier-item">
        <img :src="item.image" alt="Déguisement" class="panier-item-image" />
        <div class="panier-item-info">
          <p>{{ item.nom_costume }} - Taille : {{ item.taille }}</p>
          <p>{{ $t('panier.prix') }} : {{ item.prix }} €</p>
          <p>{{ $t('panier.quantite') }} : {{ item.quantite }}</p>
          <div class="quantity-controls">
            <button @click="diminuerQuantite(item)">-</button>
            <button @click="incrementerQuantite(item)">+</button>
          </div>
        </div>
      </div>
      <div class="panier-total">
        <p>{{ $t('panier.total') }} : {{ total }} €</p>
        <button @click="addLocationDeguisement(utilisateurConnecte.id)">{{ $t('panier.validerCommande') }}</button>
      </div>
    </div>
    <p v-else>{{ $t('panier.panierVide') }}</p>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: "PanierDeguisement",
  computed: {
    ...mapState('BaltrouilleStore', ['panier']),
    ...mapState('ProfilStore',['utilisateurConnecte']),
    total() {
      return this.panier.reduce((total, item) => total + item.prix * item.quantite, 0);
    }
  },
  methods: {
    ...mapActions('BaltrouilleStore',['incrementerQuantite','diminuerQuantite', 'getAllTailleDeguisement','addLocationDeguisement']),
    validerPanier() {
      alert("Commande validée ! Merci de votre achat.");
    }
  },
  mounted() {
    this.getAllTailleDeguisement()
  }
};
</script>

<style scoped>
.panier {
  padding: 20px;
  text-align: center;
}

.panier-item {
  display: flex;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid #ddd;
}

.panier-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.panier-item-info {
  text-align: left;
}

.panier-total {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  font-size: 1.1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
