<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <div class="payment-container">
      <h2>{{ title }}</h2>
      <form @submit.prevent="processPayment">
        <label for="name-owner">Nom du propriétaire de la carte :</label>
        <input type="text" id="name-owner" v-model="nameOwner" required />
        <label for="card-number">Numéro de carte :</label>
        <input type="text" id="card-number" v-model="cardNumber" required />
        <label for="expiry">Date d'expiration :</label>
        <input type="month" id="expiry" v-model="expiryDate" required />
        <label for="cvv">CVV :</label>
        <input type="text" id="cvv" v-model="cvv" required />
        <button type="submit">{{ buttonText }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PaymentFormCashLess',
  components: { NavBar },
  data() {
    return {
      nameOwner: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      title: this.$route.query.type === 'Rechargement' ? 'Paiement pour recharger' : 'Remboursement',
      buttonText: this.$route.query.type === 'Rechargement' ? 'Payer' : 'Demander un remboursement',
    };
  },
  computed: {
    ...mapState('ProfilStore', ['utilisateurConnecte']),
  },
  methods: {
    ...mapActions('ProfilStore', ['updateFunds','checkBankCard']),
    async processPayment() {
      let response = false;
      if (this.nameOwner === '' || this.cardNumber === '' || this.expiryDate === '' || this.cvv === '') {
        alert('Veuillez remplir tous les champs.');
        return;
      } else {
        response = await this.checkBankCard({ nom: this.nameOwner, numeroCarte: this.cardNumber, dateExpiration: this.expiryDate, cvv: this.cvv });
      }
      if (!response) {
        alert('Coordonnées bancaires invalides.');
        return;
      }
      if (this.$route.query.type === 'Rechargement') {
        response = await this.updateFunds({ idUser: this.utilisateurConnecte.id, amount: this.$route.query.amount, operation: this.title, details: "" });
      } else {
        response = await this.updateFunds({ idUser: this.utilisateurConnecte.id, amount: -this.$route.query.amount, operation: this.title, details: "" });
      }
      if (response) {
        await this.$router.push({ name: 'cashless' });
      } else {
        alert('Erreur lors du paiement.');
        await this.$router.push({ name: 'cashless' });
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  max-width: 500px;
  margin: 50px auto;
  background: #333;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  margin-top: 150px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input {
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
button {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>