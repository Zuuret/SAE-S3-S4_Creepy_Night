<template>
  <div class="login-container">
    <img src="@/assets/fond_Accueil.png" class="background" alt="fond_accueil" />

    <div class="login-box">
      <h2>Connexion</h2>
      <div class="radio-buttons">
        <label class="custom-radio" :class="{ selected: userType === 'utilisateur' }">
          <input type="radio" name="userType" value="utilisateur" v-model="userType" @click="updateErrorMessage('')">
          <span>Utilisateur</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'prestataire' }">
          <input type="radio" name="userType" value="prestataire" v-model="userType" @click="updateErrorMessage('')">
          <span>Prestataire</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'organisateur' }">
          <input type="radio" name="userType" value="organisateur" v-model="userType" @click="updateErrorMessage('')">
          <span>Organisateur</span>
        </label>
      </div>

      <form @submit.prevent="submitLogin(userType)" class="login-form">
        <div class="form-group">
          <input type="email" v-model="email" id="email" placeholder="Entrez votre email" required/>
        </div>
        <div class="form-group">
          <input type="password" v-model="password" id="password" placeholder="Entrez votre mot de passe" required/>
        </div>
        <button type="submit" class="submit-button">Se connecter</button>
      </form>
      <div class="signup-link">
        <span>
          Pas de compte ?
          <router-link to="/creation-profil">S'inscrire</router-link>
        </span>
      </div>
      <p v-if="errorMessage" class="message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from "vuex";
export default {
  name: "PageConnexion",
  data: () => ({
    userType: 'utilisateur',
    email: "",
    password: "",
  }),
  computed: {
    ...mapState('ProfilStore', ['errorMessage'])
  },
  methods: {
    ...mapActions('ProfilStore', ['loginUser', 'updateErrorMessage']),

    async submitLogin(type) {
      let logged = await this.loginUser({
        data: { email: this.email, password: this.password },
        userType: type,
      });

      if (type === 'utilisateur'){
        if (logged.success) {
          this.$router.push('/');
          return;
        }
      }
      if (type === 'organisateur') {
        if (logged.success) {
          this.$router.push('/home-organisateur');
          return;
        }
      }

      if (type === 'prestataire') {
        if (logged.success) {
          this.$router.push('/home-prestataire');
        }
      }
    }
  },
}
</script>

<style scoped>

.background {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: brightness(0.5);
}

.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
}

.login-box {
  width: 35vw;
  padding: 30px;
  background-color: white;
  text-align: center;
  position: relative;
  border-radius: 12px;
  margin-top: 20vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 45px;
  font-family: 'Creepster', cursive;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 80%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  font-family: whoAsksSatan, serif;
  outline: none;
  background-color: #f0f0f0;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: #ff0027;
  box-shadow: 0 0 5px rgba(255, 0, 39, 0.5);
}

input::placeholder {
  color: #bbb;
  font-family: whoAsksSatan, serif;
  font-size: 18px;
  opacity: 0.8;
}

.radio-buttons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}

.signup-link {
  margin-top: 10px;
}

.signup-link span {
  cursor: pointer;
  font-family: 'Creepster', cursive;
  font-size: 20px;
}

.submit-button {
  width: 50%;
  padding: 10px;
  background-color: #ff0027;
  color: white;
  font-weight: bold;
  font-family: 'Creepster', cursive;
  font-size: 25px;
  border: none;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  cursor: pointer;
  position: absolute;
  bottom: -51px;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.submit-button:hover {
  background-color: #c4001e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.message {
  margin-top: 15px;
  font-size: 14px;
  color: #28a745;
  font-family: Creepster, serif;
}
</style>