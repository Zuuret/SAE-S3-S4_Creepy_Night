<template>
  <div class="panier">
    <h2>Votre Panier</h2>
    <ul v-if="panier.length > 0">
      <li v-for="item in panier" :key="item.concert.id">
        {{ item.concert.artiste }} - {{ item.place.type_place }}
        Quantité: {{ item.quantite }}
        Prix: {{ item.place.prix_place * item.quantite }}€
      </li>
    </ul>
    <p v-else>Votre panier est vide.</p>
    <p>Total: {{ totalPanier }}€</p>
    <button @click="validerPanier">Valider le panier</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PanierConcert',
  computed: {
    ...mapState('ConcertStore', ['panier']),
    totalPanier() {
      return this.panier.reduce((total, item) => {
        return total + (item.place.prix_place * item.quantite);
      }, 0);
    }
  },
  methods: {
    ...mapActions('ConcertStore', ['validerPanier']),
    validerPanier() {
      alert('Panier validé !');
    }
  }
}
</script>