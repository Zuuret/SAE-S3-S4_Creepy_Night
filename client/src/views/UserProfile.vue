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
    padding: 30px;
    background-color: #fafafa;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 30px auto;
  }
  
  h1 {
    font-size: 2.5rem;
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .card-container {
    display: flex;
    gap: 20px;
  }
  
  .user-info-card, .transaction-history-card {
    background: #fff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 48%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .user-info-card:hover, .transaction-history-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  strong {
    color: #222;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
  }
  
  th, td {
    padding: 15px;
    text-align: left;
    font-size: 1rem;
    color: #555;
  }
  
  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  td {
    border-bottom: 1px solid #ddd;
  }
  
  td.positive {
    color: #27ae60;
    font-weight: bold;
  }
  
  td.negative {
    color: #e74c3c;
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
  
  </style>