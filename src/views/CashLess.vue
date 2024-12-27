<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <div class="cashless-info">
      <h2>CashLess</h2>
      <div class="info-container">
        <div class="text-section">
          <p>Le paiement dématérialisé, l'unique moyen de paiement au Creepy Night Festival</p>
          <p class="list">Mon espace me permet de :</p>
          <ul>
            <li>Consulter le solde de mon bracelet et l'historique de mes transactions</li>
            <li>Enregistrer ma CB pour pouvoir re-créditer mon bracelet en quelques secondes</li>
            <li>Obtenir le remboursement du solde de mon bracelet après l'événement</li>
          </ul>
        </div>
        <div class="image-section">
          <img src="@/assets/BraceletCashLess.png" alt="Bracelet CashLess" class="bracelet-image" />
        </div>
      </div>
      <div class="steps">
        <div class="step">
          <h3>1. Créditer votre compte CashLess</h3>
          <p>Rendez-vous sur cette page ou sur l’application mobile pour créditer votre bracelet. Puis le jour J, présentez votre billet à l'entrée pour récupérer votre bracelet préchargé</p>
        </div>
        <div class="step">
          <h3>2. Le paiement simplifié</h3>
          <p>Utilisez votre bracelet pour régler sur place vos achats (sauf exceptions).</p>
        </div>
        <div class="step">
          <h3>3. Remboursement</h3>
          <p>À la fin du festival, s'il vous reste du crédit, rendez-vous sur votre compte en ligne pour demander le remboursement du 2 au 15 Novembre inclus. Aucun remboursement accepté une fois cette date passée.</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="wallet">
        <h2>Votre porte-monnaie</h2>
        <div class="balance">
          <p>Solde actuel : <span class="amount">{{ utilisateur.solde.toFixed(2) }} €</span></p>
          <button class="recharge-button" @click="recharge">Recharger</button>
          <button class="refund-button" @click="refund">Remboursement</button>
        </div>
        <div class="ticket-info">
          <img src="@/assets/qr.png" alt="QR Code" class="qr-code-image" />
          <p>N° de billet : {{ utilisateur.numCashless }}</p>
          <button class="view-ticket">Voir mon billet</button>
        </div>
      </div>
      <div class="transactions">
        <h2>Mes dernières transactions :</h2>
        <ul>
          <li v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item">
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
import { mapState, mapActions } from "vuex";

export default {
  name: 'CashLess',
  components: { NavBar },
  computed: {
    ...mapState('CashLessStore',['transactions', 'utilisateur']),
    filteredTransactions() {
      return this.transactions.filter((transaction) => transaction.id_utilisateur === this.utilisateur.id);
    }
  },
  methods: {
    ...mapActions('CashLessStore',['getAllTransactions', 'updateFunds']),
    recharge() {
      alert('Fonctionnalité non disponible pour le moment');
    },
    refund() {
      alert('Fonctionnalité non disponible pour le moment');
    }
  },
  data() {
    return {
      soldes: 0,
      numCashless: 0
    }
  },
  mounted() {
    this.getAllTransactions();
  },
};
</script>

<style scoped>
.cashless-info {
  padding: 20px;
  margin-top: 100px;
  background: rgba(0, 0, 0, 0.8);
  color: #ccc;
  border-bottom: 3px solid #ff0000;
}

.info-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.text-section {
  max-width: 60%;
  margin-right: 20px;
}

.text-section p {
  color: #ccc;
  margin : 0;
}

.cashless-info h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #ff0000;
  margin-bottom: 10px;
}

.text-section ul {
  list-style-type: disc;
  padding-left: 20px;
}

.text-section .list {
  margin-top: 25px;
}

.image-section {
  max-width: 35%;
}

.bracelet-image {
  max-width: 40%;
  height: auto;
  border-radius: 10px;
}

.steps {
  margin-inline: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.step {
  padding: 10px;
  border-left: 3px solid #ff0000;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}

.step h3 {
  margin: 0 0 5px 0;
  color: #ff0000;
}

.step p {
  margin: 0;
  font-size: 1rem;
  color: #ccc;
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
  color: #ccc;
  padding: 20px;
  width: 450px;
}

.wallet h2, .transactions h2 {
  text-align: center;
  font-size: 1.5rem;
  color: #ff0000;
}

.balance {
  text-align: center;
  margin: 40px 0;
}

.balance p {
  font-size: 1.2rem;
  color: #ccc;
}

.amount {
  font-size: 1.5rem;
  color: #ff0000;
}

.ticket-info {
  text-align: center;
}

.ticket-info p {
  font-size: 1.2rem;
  color: #ccc;
}

.recharge-button, .refund-button, .view-ticket {
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
  color: #ccc;
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
