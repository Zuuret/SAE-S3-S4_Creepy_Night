<template>
  <div>
    <h1>Détails de l'utilisateur</h1>
    <p><strong>Prénom :</strong> {{ utilisateur.prenom }}</p>
    <p><strong>Nom :</strong> {{ utilisateur.nom }}</p>
    <p><strong>Date de Naissance :</strong> {{ utilisateur.dateNaissance }}</p>
    <p><strong>Email :</strong> {{ utilisateur.email }}</p>
    <p><strong>Solde Actuel :</strong> {{ utilisateur.solde }}</p>
    <p><strong>Numéro Cashless :</strong> {{ utilisateur.numCashless }}</p>

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