<template>
  <div class="login-container">
    <img src="@/assets/fond_Accueil.png" class="background" alt="fond_accueil" />
    <div class="login-box">
      <h2>Connexion</h2>
      <form @submit.prevent="submitLogin" class="login-form">
        <div class="form-group">
          <input type="email" v-model="email" id="email" placeholder="Entrez votre email" required/>
        </div>
        <div class="form-group">
          <input type="password" v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required/>
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
    email: "",
    motDePasse: "",
  }),
  computed: {
    ...mapState('ProfilStore', ['errorMessage'])
  },
  methods: {
    ...mapActions('ProfilStore', ['loginUser']),

    async submitLogin() {
      let userLogged = await this.loginUser({
        data: { email: this.email, motDePasse: this.motDePasse },
        userType: 'utilisateur',
      });
      if (userLogged.success) {
        this.$router.push('/');
        return;
      }
      let orgLogged = await this.loginUser({
        data: { email: this.email, motDePasse: this.motDePasse },
        userType: 'organisateur',
      });
      if (orgLogged.success) {
        this.$router.push('/home-organisateur');
        return;
      }
      let prestLogged = await this.loginUser({
        data: { email: this.email, motDePasse: this.motDePasse },
        userType: 'prestataire',
      });
      if (prestLogged.success) {
        this.$router.push('/home-prestataire');
      }
    }
  }
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