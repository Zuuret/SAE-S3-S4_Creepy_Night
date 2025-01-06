<template>
  <div class="user-profile">
    <h1>Détails de l'utilisateur</h1>
    <div class="card-container">
      <div class="user-info-card">
        <h2>Informations de l'utilisateur</h2>
        <p><strong>Prénom :</strong> {{ utilisateur.prenom }}</p>
        <p><strong>Nom :</strong> {{ utilisateur.nom }}</p>
        <p><strong>Date de Naissance :</strong> {{ utilisateur.dateNaissance }}</p>
        <p><strong>Email :</strong> {{ utilisateur.email }}</p>
        <p><strong>Solde Actuel :</strong> {{ utilisateur.solde }} €</p>
        <p><strong>Numéro Cashless :</strong> {{ utilisateur.numCashless }}</p>
      </div>

      <div class="transaction-history-card">
        <h2>Historique des Paiements</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opération</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.operation }}</td>
              <td :class="{ positive: transaction.amount > 0, negative: transaction.amount < 0 }">
                {{ transaction.amount > 0 ? '+' : '' }}{{ parseFloat(transaction.amount).toFixed(2) }} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      utilisateur: {}
    };
  },
  computed: {
    ...mapState("profil", ["utilisateurs"]),
    ...mapState("CashLessStore", ["transactions"]),
    filteredTransactions() {
      console.log("Transactions:", this.transactions);
      console.log("Utilisateur ID:", this.utilisateur.id);
      return this.transactions.filter(transaction => transaction.id_utilisateur === this.utilisateur.id);
    },
  },
  methods: {
    ...mapActions('CashLessStore', ['getAllTransactions']),
  },
  mounted() {
    this.getAllTransactions();
    const userId = this.$route.params.id;
    this.utilisateur = this.utilisateurs.find(user => user.id === parseInt(userId));
  }
};
</script>

<style scoped>
.user-profile {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.user-info-card, .transaction-history-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 48%; /* Ajustez la largeur selon vos besoins */
}

h2 {
  color: #ff0000; /* Couleur pour les titres */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.positive {
  color: #00ff00; /* Vert pour les montants positifs */
}

.negative {
  color: #ff0000; /* Rouge pour les montants négatifs */
}
</style> 