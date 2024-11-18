<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <h1>CashLess</h1>
    <div class="container">
      <div class="wallet">
        <h2>Votre porte-monnaie</h2>
        <div class="balance">
          <p>Solde actuel :</p>
          <span class="amount">{{ soldes.toFixed(2) }} €</span>
          <button class="refund-button">Remboursement</button>
        </div>
        <div class="ticket-info">
          <img src="@/assets/qr.png" alt="QR Code" class="qr-code-image" />
          <p>N° de billet : {{ numBillet }}</p>
          <button class="view-ticket">Voir mon billet</button>
        </div>
      </div>
      <div class="transactions">
        <h2>Mes dernières activités :</h2>
        <ul>
          <li v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
            <p>{{ transaction.date }}</p>
            <div class="transaction-details">
              <span>{{ transaction.operation }}</span>
              <span :class="{ positive: transaction.amount > 0, negative: transaction.amount < 0 }">
                {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount.toFixed(2) }} €
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'CashLess',
  components: { NavBar },
  data() {
    return {
      soldes: 0,
      transactions: [],
      numBillet: 0
    }
  },
};
</script>

<style scoped>
.header h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #ff0000;
}

.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.wallet, .transactions {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #ff0000;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
}

.wallet h2, .transactions h2 {
  text-align: center;
  font-size: 1.5rem;
  color: #ff0000;
}

.balance {
  text-align: center;
  margin: 20px 0;
}

.balance p {
  font-size: 1.2rem;
}

.amount {
  font-size: 2rem;
  color: #ff0000;
}

.refund-button, .view-ticket {
  background: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.transactions ul {
  list-style: none;
  padding: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.transaction-item p {
  margin: 0;
}

.transaction-details {
  text-align: right;
}

.positive {
  color: #00ff00;
}

.negative {
  color: #ff0000;
}

</style>