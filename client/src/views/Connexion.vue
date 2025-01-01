<template>
  <div class="login-container">
    <img src="@/assets/fond_login.png" class="background" alt="fond_login" />
    <div class="login-box">
      <img src="@/assets/Scream_login.jpg" class="pdp" alt="pdp">
      <h2>Connexion</h2>
      <form @submit.prevent="submitLogin" class="login-form">
        <div class="form-group">
          <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Entrez votre email"
              required
          />
        </div>
        <div class="form-group">
          <input
              type="password"
              v-model="motDePasse"
              id="motDePasse"
              placeholder="Entrez votre mot de passe"
              required
          />
        </div>
        <button type="submit" class="submit-button">Se connecter</button>
      </form>
      <div class="signup-link">
        <span>
          Pas de compte ?
          <router-link to="/profil">S'inscrire</router-link>
        </span>
      </div>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { utilisateurs, organisateurs, prestataires } from "@/datasource/data.js";

export default {
  name: "PageConnexion",
  data: () => ({
    email: "",
    motDePasse: "",
    message: "",
  }),
  methods: {
    submitLogin() {
      const user = utilisateurs.find(
          (user) => user.email === this.email && user.motDePasse === this.motDePasse
      );
      const organisateur = organisateurs.find(
          (org) =>
              org.email === this.email && org.motDePasse === this.motDePasse
      );
      const prestataire = prestataires.find(
          (prest) =>
              prest.email === this.email && prest.motDePasse === this.motDePasse
      )
      if (user) {
        this.message = "Connexion réussie en tant qu'utilisateur !";
        localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
        if (this.$route.path !== "/") {
          this.$router.push({ path: "/" });
        }
      } else if (organisateur) {
        this.message = "Connexion réussie en tant qu'organisateur !";
        localStorage.setItem(
            "utilisateurConnecte",
            JSON.stringify(organisateur)
        );
        if (this.$route.path !== "/home-organisateur") {
          this.$router.push({ path: "/home-organisateur" });
        }
      } else if (prestataire) {
        this.message = "Connexion réussie en tant que prestataire !";
        localStorage.setItem(
            "utilisateurConnecte",
            JSON.stringify(prestataire)
        );
        if (this.$route.path !== "/") {
          this.$router.push({ path: "/" });
        }
      } else {
        this.message =
            "Connexion impossible : l'email ou le mot de passe est incorrect.";
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'whoAsksSatan';
  src: url('@/assets/fonts/who asks satan.ttf') format('truetype');
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: brightness(0.8);
}

.login-container {
  width: 100%;
  position: fixed;
  top: 200px;
  right: 90px;
  display: flex;
  justify-content: flex-end;
}
.login-box {
  width: 35%;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid black;
  text-align: center;
  position: relative;
}
.login-box .pdp {
  top: -80px;
  width: 25%;
  height: 42%;
  border-radius: 75px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}
h2 {
  font-size: 45px;
  padding-top: 15px;
  margin-bottom: 15px;
  color: #ffffff;
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
  width: 95%;
  padding: 10px;
  border: 2px solid #000000;
  border-radius: 25px;
  font-size: 22px;
  font-family: whoAsksSatan, serif;
  outline: none;
  background-color: rgba(128, 128, 128, 0.67);
  color: white;
}
input::placeholder {
  color: #ffffff;
  font-family: whoAsksSatan,serif;
  font-size: 22px;
  opacity: 0.8;
}
input:focus {
  border-color: #9f041c;
  box-shadow: 0 0 5px rgb(255, 0, 40);
}
.signup-link {
  margin-top: 10px;
}
.signup-link span {
  color: #ffffff;
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
}
.submit-button:hover {
  background-color: #9f041c;
}
.message {
  margin-top: 15px;
  font-size: 14px;
  color: #28a745;
  font-family: Creepster, serif;
}
</style>
