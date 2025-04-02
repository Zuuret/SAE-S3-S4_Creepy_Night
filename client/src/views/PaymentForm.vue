<template>
  <div class="payment-form">
    <h1>{{ $t('formulairePaiement') }}</h1>
    <p>{{ $t('achatBillet') }} {{ ticketPrice }} €.</p>
    <form @submit.prevent="submitPayment">
      <div>
        <label for="card-number">{{ $t('numeroCarte') }} :</label>
        <input type="text" id="card-number" v-model="cardNumber" required />
      </div>
      <div>
        <label for="expiry-date">{{ $t('dateExpiration') }} (MM/AA) :</label>
        <input type="text" id="expiry-date" v-model="expiryDate" required />
      </div>
      <div>
        <label for="cvv">{{ $t('cvv') }} :</label>
        <input type="text" id="cvv" v-model="cvv" required />
      </div>
      <button type="submit">{{ $t('payer') }}</button>
    </form>
  </div>
</template>

  
  <script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      };
    },
    computed: {
      ticketPrice() {
        return this.$route.params.price;
      },
    },
    methods: {
      ...mapActions('transactions', ['addTransaction']),
      async submitPayment() {
        const paymentDetails = {
          date: new Date().toISOString().split('T')[0],
          amount: this.ticketPrice,
          cardNumber: '**** **** **** ' + this.cardNumber.slice(-4),
          id_utilisateur: 1,
        };
        await this.addTransaction(paymentDetails);

        alert('Paiement fictif effectué avec succès !');
        this.$router.push({ name: 'billet' });
      },
    },
  };
  </script>
  
  <style scoped>
  .payment-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .payment-form h1 {
    text-align: center;
  }
  .payment-form form div {
    margin-bottom: 15px;
  }
  .payment-form label {
    display: block;
    margin-bottom: 5px;
  }
  .payment-form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  .payment-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .payment-form button:hover {
    background-color: #0056b3;
  }
  </style>