<template>
  <div class="form-container">

    <div class="form-box">

      <h2>Inscription</h2>

      <form @submit.prevent="submitForm" class="form-content">
        <!-- User fields (arranged in a column) -->
        <div>
          <div class="form-group">
            <label>Nom/Prénom :</label>
            <input type="text" placeholder="Entrez votre nom et prénom" v-model="form.createur" />
          </div>

          <div class="form-group">
            <label>Date de création :</label>
            <input type="date" placeholder="jj/mm/aaaa" v-model="form.dateCrea" />
          </div>

          <div class="form-group">
            <label>Description :</label>
            <input type="text" placeholder="Insérez une description" v-model="form.description" />
          </div>

          <div class="form-group">
            <label>Email :</label>
            <input type="email" placeholder="Entrez votre email" v-model="form.email" />
          </div>

          <div class="form-group">
            <label>Confirmation de l'email :</label>
            <input type="email" placeholder="Confirmez votre email" v-model="form.confirmEmail" />
          </div>
          <!--
          <div class="form-group">
            <label>Image :</label>
            <input type="text" v-model="form.image" />
          </div>
          -->
        </div>

        <button type="submit" class="submit-button" @click="submitForm">Confirmer l'inscription</button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        createur: '',
        dateCrea: '',
        description: '',
        image: 'null',
        email: '',
        confirmEmail: '',
      },
      message: ''
    };
  },
  methods: {
    ...mapActions(['setOeuvre']),
    submitForm() {
      this.injectionBdd();
    },
    injectionBdd() {
      if ((this.form.createur != '') && (this.form.email != '') && (this.form.dateCrea != '') && (this.form.description != '') && (this.form.image != 'null')) {
        if (this.form.email != this.form.confirmEmail) {
          this.message = "L'email n'est pas identique à l'email de confirmation";
        } else {
          this.message = "Demande d'emplacement envoyée.";
          this.setOeuvre([this.form.createur,this.form.email,this.form.dateCrea,this.form.description,this.form.image]);
        }
      } else {
        this.message = "Une information est manquante.";
      }
    }
  }
};
</script>

<style scoped>

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

.user-type-tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.user-type-tabs span {
  cursor: pointer;
}

.user-type-tabs .active {
  color: blue;
  text-decoration: underline;
}

.form-box {
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.form-content {
  display: flex;
  flex-direction: column;
}

.form-content label {
  font-weight: bold;
  margin-top: 10px;
}

.form-content input {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  margin-top: 15px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.message {
  color: green;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>