<template>
  <div class="user-profile" v-if="utilisateur && utilisateur.prenom">
    <!-- Flèche de retour moderne -->
    <button class="back-arrow" @click="$router.push('/orga-utilisateurs')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <h1>Détails de l'utilisateur</h1>
    <div class="card-container">
      <div class="user-info-card">
        <h2>Informations de l'utilisateur</h2>
        <p><strong>Prénom :</strong> {{ utilisateur.prenom }}</p>
        <p><strong>Nom :</strong> {{ utilisateur.nom }}</p>
        <p><strong>Date de Naissance :</strong> {{ utilisateur.date_naissance }}</p>
        <p><strong>Email :</strong> {{ utilisateur.mail }}</p>
        <p><strong>Solde Actuel :</strong> {{ utilisateur.solde }} €</p>
        <p><strong>Numéro Cashless :</strong> {{ utilisateur.num_cashless }}</p>
      </div>

      <div class="transaction-history-card">
        <h2>Historique des transactions</h2>
        <div v-if="loadingTransactions" class="loading-transactions">
          Chargement des transactions...
        </div>
        <div v-else-if="transactionsError" class="transactions-error">
          {{ transactionsError }}
        </div>
        <ul v-else class="transactions-list">
          <li v-if="filteredTransactions.length === 0" class="no-transactions">
            Aucune transaction trouvée pour cet utilisateur.
          </li>
          <li v-else v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item">
            <p class="transaction-date">{{ formatDate(transaction.date) }}</p>
            <div class="transaction-details">
              <span class="transaction-operation">{{ transaction.operation }}</span>
              <span :class="{ positive: transaction.montant > 0, negative: transaction.montant < 0 }">
                {{ formatAmount(transaction.montant) }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="loading-user">
    Chargement de l'utilisateur...
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      utilisateur: {},
      loadingTransactions: false,
      transactionsError: null
    };
  },
  computed: {
    ...mapState("profil", ["utilisateurs"]),
    ...mapState("CashLessStore", ["transactions", "transactionsUser"]),
    filteredTransactions() {
      // Vérifie que transactionsUser est bien un tableau avant d'utiliser map
      if (!Array.isArray(this.transactionsUser)) {
        return [];
      }
      return this.transactionsUser.map(tx => ({
        ...tx,
        montant: Number(tx.montant) || 0,
      }));
    },
  },
  methods: {
    ...mapActions('CashLessStore', ['getUserTransactions']),
    formatDate(dateString) {
      if (!dateString) return "Date inconnue";
      const date = new Date(dateString);
      return date.toLocaleString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatAmount(montant) {
      if (!montant || isNaN(Number(montant))) return "0.00 €";
      return `${montant > 0 ? "+" : ""}${Number(montant).toFixed(2)} €`;
    },
    async loadUserTransactions(userId) {
      this.loadingTransactions = true;
      this.transactionsError = null;
      try {
        await this.getUserTransactions(userId);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.transactionsError = "Aucune transaction trouvée pour cet utilisateur.";
        } else {
          this.transactionsError = "Erreur lors du chargement des transactions.";
          console.error("Erreur de chargement des transactions:", error);
        }
      } finally {
        this.loadingTransactions = false;
      }
    }
  },
  async mounted() {
    const userId = this.$route.params.id;
    this.utilisateur = this.utilisateurs.find(user => user.id === userId);
    await this.loadUserTransactions(userId);
  },
  watch: {
    utilisateurs(newUsers) {
      const userId = parseInt(this.$route.params.id);
      this.utilisateur = newUsers.find(user => user.id === userId);
    }
  },
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
  padding-top: 20px; /* Ajouté pour l'espace avec la flèche */
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

/* Styles pour les transactions */
.transactions-list {
  list-style: none;
  padding: 0;
}

.transaction-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.transaction-date {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-operation {
  font-weight: 500;
}

.positive {
  color: #27ae60;
  font-weight: bold;
}

.negative {
  color: #e74c3c;
  font-weight: bold;
}

.back-arrow {
  position: absolute;
  top: 30px;
  left: 30px;
  background: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-arrow:hover {
  background: #f5f5f5;
  transform: translateX(-3px);
}

.back-arrow svg {
  transition: transform 0.3s ease;
}

.back-arrow:hover svg {
  transform: scale(1.1);
}

.no-transactions {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.transactions-error {
  color: #e74c3c;
  text-align: center;
  padding: 20px;
}
</style>