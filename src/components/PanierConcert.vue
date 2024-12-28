<template>
  <div class="panier">
    <h2>Votre Panier</h2>
    <div v-if="panier">
      <div v-for="item in panier" :key="item.concertId" class="panier-item">
        <div>
          <h3>{{ item.concert.titre }}</h3>
          <p>Nombre de places: {{ item.nbPlaces }}</p>
          <p>Prix unitaire: {{ item.place.prix_place }} €</p>
          <p>Total: {{ item.prixTotal }} €</p>
        </div>
        <div class="actions">
          <button @click="retirerDuPanier(item.concertId, 1)">Retirer une place</button>
          <button @click="retirerDuPanier(item.concertId, item.nbPlaces)">Supprimer tout</button>
        </div>
      </div>
      <div class="total">
        <p><strong>Total du panier: {{ totalPanier }} €</strong></p>
      </div>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
    <div v-if="panier.length > 0">
      <button @click="validerPaiement">Valider la commande</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Récupérer les données du panier dans Vuex
    panier() {
      return this.$store.state.panier;  // Accède à l'état du panier dans Vuex
    },
    totalPanier() {
      // Utiliser un getter ou calculer le total du panier
      return this.$store.getters.getTotalPanier;
    }
  },
  methods: {
    retirerDuPanier(concertId, nbPlaces) {
      // Appeler l'action Vuex pour retirer du panier
      this.$store.dispatch('concert/retraitDuPanier', {concertId, nbPlaces});
    },
    validerPaiement() {
      // Implémenter la logique de validation du paiement ici
      // Par exemple, ouvrir une fenêtre de paiement ou envoyer une requête à l'API
      console.log("Validation de la commande");
    }
  }
};
</script>

<style scoped>
.panier {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.panier-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.actions button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #c0392b;
}

.total {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
