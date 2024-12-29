<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Connexion</h2>
        <form @submit.prevent="submitLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" v-model="email" id="email" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="motDePasse">Mot de passe :</label>
            <input type="password" v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required>
          </div>
          <button type="submit" class="submit-button">Se connecter</button>
        </form>
        <div class="signup-link">
          <span>Pas de compte ? <router-link to="/profil">S'inscrire</router-link></span>
        </div>
        <div v-if="message" class="message">{{ message }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { utilisateurs, organisateurs } from '@/datasource/data.js';
  
  export default {
    name: "PageConnexion",
    data: () => ({
      email: '',
      motDePasse: '',
      message: ''
    }),
    methods: {
      submitLogin() {
        const user = utilisateurs.find(user => user.email === this.email && user.motDePasse === this.motDePasse);
        const organisateur = organisateurs.find(org => org.email === this.email && org.motDePasse === this.motDePasse);

        if (user) {
          this.message = "Connexion réussie en tant qu'utilisateur !";
          localStorage.setItem('utilisateurConnecte', JSON.stringify(user));
          if (this.$route.path !== '/') {
            this.$router.push({ path: '/' });
          }
        } else if (organisateur) {
          this.message = "Connexion réussie en tant qu'organisateur !";
          localStorage.setItem('utilisateurConnecte', JSON.stringify(organisateur));
          if (this.$route.path !== '/home-organisateur') {
            this.$router.push({ path: '/home-organisateur' });
          }
        } else {
          this.message = "Connexion impossible : l'email ou le mot de passe est incorrect.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login-box {
    width: 350px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
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
  
  .signup-link {
    margin-top: 15px;
    text-align: center;
  }
  
  .signup-link span {
    color: blue;
    cursor: pointer;
  }
  
  .message {
    color: green;
    font-weight: bold;
    margin-top: 15px;
    text-align: center;
  }
  </style>