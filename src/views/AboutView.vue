<template>
  <div class="inscriptionProfil">
    <h1>Inscription</h1>
    <form @submit.prevent="enregistrementUtilisateur({ prenom, nom, dateNaissance, email, emailConfirmation, motDePasse })">
      <div class="form-group">
        <label for="prenom">Prénom :</label>
        <input type="text" v-model="prenom" id="prenom" placeholder="Entrez votre prénom" required>
      </div>
      <div class="form-group">
        <label for="nom">Nom :</label>
        <input type="text" v-model="nom" id="nom" placeholder="Entrez votre nom" required>
      </div>
      <div class="form-group">
        <label for="dateNaissance">Date de naissance :</label>
        <input type="date" v-model="dateNaissance" id="dateNaissance" required>
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" v-model="email" id="email" placeholder="Entrez votre email" required>
      </div>
      <div class="form-group">
        <label for="emailConfirmation">Confirmation de l'email :</label>
        <input type="email" v-model="emailConfirmation" id="emailConfirmation" placeholder="Confirmez votre email" required>
      </div>
      <div class="form-group">
        <label for="motDePasse">Mot de passe :</label>
        <input type="password" v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required>
      </div>
      <button type="submit" class="btn-submit">Confirmer l'inscription</button>
    </form>

    <div v-if="utilisateur" class="success-message">
      <p>Nouvel utilisateur ajouté : <strong>{{ utilisateur.prenom }} {{ utilisateur.nom }}</strong></p>
    </div>

    <div v-if="utilisateurs.length > 0" class="user-list">
      <h2>Liste des utilisateurs :</h2>
      <ul>
        <li v-for="user in utilisateurs" :key="user.id">
          {{ user.prenom }} {{ user.nom }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AboutView.vue',
  data: () => ({
    prenom: '',
    nom: '',
    dateNaissance: '',
    email: '',
    emailConfirmation: '',
    motDePasse: '',
  }),
  computed: {
    ...mapState(['utilisateur', 'utilisateurs']),
  },
  methods: {
    ...mapActions(['enregistrementUtilisateur','getAllUser']),
  },
  mounted() {
    this.getAllUser();
  }
}
</script>

<style scoped>
.inscriptionProfil {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #4caf50;
  background-color: #dff0d8;
  color: #3c763d;
  border-radius: 4px;
}

.user-list {
  margin-top: 20px;
}

.user-list h2 {
  color: #333;
}

.user-list ul {
  list-style-type: none;
  padding: 0;
}

.user-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
