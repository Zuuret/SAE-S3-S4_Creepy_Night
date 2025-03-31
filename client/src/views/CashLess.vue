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

    <div class="container" v-if="utilisateurConnecte">
      <div class="wallet">
        <h2>Votre porte-monnaie</h2>
        <div class="balance">
          <p>Solde actuel : <span class="amount">{{ soldeAffiche.toFixed(2) }} €</span></p>
          <button class="recharge-button" @click="openModal('Rechargement')">Recharger</button>
          <button class="refund-button" @click="openModal('Remboursement')">Remboursement</button>
        </div>
        <div class="ticket-info">
          <vue-qr :text="utilisateurConnecte.num_cashless" :size="200"></vue-qr>
          <p>N° de billet : {{ utilisateurConnecte.num_cashless }}</p>
        </div>
      </div>
      <div class="transactions">
        <h2>Mes dernières transactions :</h2>
        <ul>
          <li v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item">
            <p>{{ formatDate(transaction.date) }}</p>
            <div class="transaction-details">
              <span>{{ transaction.operation }}</span>
              <span :class="{ positive: transaction.montant > 0, negative: transaction.montant < 0 }">
              {{ formatAmount(transaction.montant) }}
            </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <label for="amount">Montant :</label>
        <input type="number" id="amount" v-model="transactionAmount" min="0" step="0.01" /><br>
        <button class="modal-button" @click="processTransaction">{{ modalButton }}</button>
        <button class="modal-cancel" @click="closeModal">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VueQr from "vue-qr";
import { mapState, mapActions } from "vuex";

export default {
  name: 'CashLess',
  data() {
    return {
      showModal: false,
      modalTitle: '',
      modalButton: '',
      transactionAmount: 0,
      transactionType: '',
    };
  },
  components: { VueQr, NavBar },
  computed: {
    ...mapState('CashLessStore',['transactions','transactionsUser']),
    ...mapState('ProfilStore',['utilisateurConnecte']),
    filteredTransactions() {
      return this.transactionsUser.map(tx => ({
        ...tx,
        montant: Number(tx.montant) || 0,
      }));
    },
    soldeAffiche() {
      const solde = this.utilisateurConnecte?.solde || 0;
      return Number(solde);
    },
  },
  methods: {
    ...mapActions('CashLessStore',['getUserTransactions']),
    openModal(type) {
      this.showModal = true;
      this.transactionType = type;
      if (type === 'Rechargement') {
        this.modalTitle = 'Créditer votre compte';
        this.modalButton = 'Procéder au paiement';
      } else {
        this.modalTitle = 'Demander un remboursement';
        this.modalButton = 'Procéder au remboursement';
      }
    },
    closeModal() {
      this.showModal = false;
      this.transactionAmount = 0;
    },
    processTransaction() {
      if (this.transactionAmount <= 0) {
        alert('Veuillez entrer un montant valide.');
        return;
      }
      this.$router.push({
        name: 'PaymentFormCashLess',
        query: { type: this.transactionType, amount: this.transactionAmount },
      });
    },
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
    }

  },
  async mounted() {
    if (this.utilisateurConnecte?.id) {
      await this.getUserTransactions(this.utilisateurConnecte.id);
    }
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
  width: 550px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}

.modal-button {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.modal-cancel {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
