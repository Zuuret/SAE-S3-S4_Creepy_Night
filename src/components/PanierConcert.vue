<template>
  <div class="panier">
    <h2>Votre Panier</h2>
    <div v-if="panier.length > 0" class="panier-scroll">
      <table>
        <thead>
        <tr>
          <th>Artiste</th>
          <th>Nombre de places</th>
          <th>Prix unitaire (€)</th>
          <th>Total (€)</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in panier" :key="item.concertId">
          <td>{{ item.concert.artiste }}</td>
          <td>{{ item.nbPlaces }}</td>
          <td>{{ item.place[0].prix_place }} €</td>
          <td>{{ item.prixTotal }} €</td>
          <td class="actions">
            <button @click="retirerDuPanier({ concertId: item.concertId })">Retirer une place</button>
            <button @click="viderPlace({ concertId: item.concertId })">Supprimer tout</button>
          </td>
        </tr>
        </tbody>
      </table>
      <p><strong>Total du panier : {{ totalPanier }} €</strong></p>
      <div v-if="panier.length > 0">
        <button @click="validerPaiement">Valider la commande</button>
      </div>
    </div>
    <div v-else>
      <p>Votre panier est vide</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState('ConcertStore',['panier']),
    totalPanier() {
      return this.panier.reduce((total, item) => total + item.nbPlaces * item.place[0].prix_place, 0);
    },
  },
  methods: {
    ...mapActions('ConcertStore', ['retirerDuPanier','viderPlace']),
    validerPaiement() {
      console.log("Validation de la commande");
    }
  }
};
</script>

<style scoped>
.panier {
  position: fixed;
  right: 35px;
  top: 20px;
  width: 38%;
  padding: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.4));
  border: 3px solid #b71c1c;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  max-height: 89vh;
  display: flex;
  flex-direction: column;
}
.panier-scroll {
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 20px;
  margin-bottom: 20px;
}
.panier-scroll::-webkit-scrollbar {
  width: 12px;
}
.panier-scroll::-webkit-scrollbar-thumb {
  background-color: #b71c1c;
  border-radius: 6px;
  border: 3px solid #fff;
}
.panier-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #880e0e;
}
.panier-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
h2 {
  margin: 0;
  color: #b71c1c;
  font-family: "Stencil Std", fantasy;
  text-transform: uppercase;
  font-size: 35px;
  text-align: center;
  margin-bottom: 20px;
}
table {
  border-collapse: collapse;
}
th, td {
  width: 90%;
  padding: 0 15px 0 15px;
  text-align: center;
  border: 3px solid #a39494;
  font-family: "Stencil Std", fantasy;
  text-transform: uppercase;
}

th {
  background-color: #f1f1f1;
  font-size: 19px;
  color: #b71c1c;
}
td {
  font-size: 22px;
  color: #333;
}
.actions button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 10px;
  font-family: "Stencil Std", fantasy;
  font-size: 14px;
  text-transform: uppercase;
}
.actions button:first-child {
  margin: 10px 0 10px 0;
}
.actions button:last-child{
  margin: 0 0 10px 0;
}
.actions button:hover {
  background-color: #c0392b;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  font-family: "Stencil Std", fantasy;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #880e0e;
}
p {
  color: #b71c1c;
  font-family: "Stencil Std", fantasy;
  text-transform: uppercase;
  font-size: 25px;
  text-align: center;
}
</style>


