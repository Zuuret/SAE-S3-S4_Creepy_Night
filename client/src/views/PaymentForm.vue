<template>
    <div class="payment-form">
      <h1>Formulaire de Paiement</h1>
      <p>Vous êtes sur le point d'acheter un billet pour le festival Creepy Night au prix de {{ ticketPrice }} €.</p>
      <form @submit.prevent="submitPayment">
        <div>
          <label for="card-number">Numéro de carte :</label>
          <input type="text" id="card-number" v-model="cardNumber" required />
        </div>
        <div>
          <label for="expiry-date">Date d'expiration (MM/AA) :</label>
          <input type="text" id="expiry-date" v-model="expiryDate" required />
        </div>
        <div>
          <label for="cvv">CVV :</label>
          <input type="text" id="cvv" v-model="cvv" required />
        </div>
        <button type="submit">Payer</button>
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
        return this.$route.params.price; // Récupérez le prix du ticket à partir des paramètres de la route
      },
    },
    methods: {
      ...mapActions('transactions', ['addTransaction']), // Ajoutez l'action pour ajouter une transaction
      async submitPayment() {
        const paymentDetails = {
          date: new Date().toISOString().split('T')[0],
          amount: this.ticketPrice,
          cardNumber: '**** **** **** ' + this.cardNumber.slice(-4),
          id_utilisateur: 1, // Remplacez par l'ID de l'utilisateur connecté
        };

        // Ajoutez la transaction via le store
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