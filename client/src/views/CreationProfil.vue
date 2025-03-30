<template>
  <div class="background-container">
    <div class="form-container">
      <h1 class="titre-formulaire">Création de profil</h1>
      <div class="radio-buttons">
        <label class="custom-radio" :class="{ selected: userType === 'utilisateur' }">
          <input type="radio" name="userType" value="utilisateur" v-model="userType" @change="resetForm">
          <span>Utilisateur</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'organisateur' }">
          <input type="radio" name="userType" value="organisateur" v-model="userType" @change="resetForm">
          <span>Organisateur</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'prestataire' }">
          <input type="radio" name="userType" value="prestataire" v-model="userType" @change="resetForm">
          <span>Prestataire</span>
        </label>
      </div>

      <div v-if="userType === 'utilisateur'" class="form-box">
        <form @submit.prevent="submitFormUtilisateur" class="form-content">
          <div class="form-group">
            <label for="prenomUtilisateur">Prénom :</label>
            <input type="text" v-model="utilisateur.prenom" id="prenomUtilisateur" placeholder="Entrez votre prénom" required>
          </div>
          <div class="form-group">
            <label for="nomUtilisateur">Nom :</label>
            <input type="text" v-model="utilisateur.nom" id="nomUtilisateur" placeholder="Entrez votre nom" required>
          </div>
          <div class="form-group">
            <label for="dateNaissanceUtilisateur">Date de naissance :</label>
            <input type="date" v-model="utilisateur.dateNaissance" id="dateNaissanceUtilisateur" required>
          </div>
          <div class="form-group">
            <label for="emailUtilisateur">Email :</label>
            <input type="email" v-model="utilisateur.email" id="emailUtilisateur" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="confirmEmailUtilisateur">Confirmation de l'email :</label>
            <input type="email" v-model="utilisateur.confirmEmail" id="confirmEmailUtilisateur" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="passwordUtilisateur">Mot de passe :</label>
            <input type="password" v-model="utilisateur.password" id="passwordUtilisateur" placeholder="Entrez votre mot de passe" required>
          </div>
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="login-link">
            Déjà un compte Creepynight ?
            <router-link to="/connexion" class="link">Connectez-vous</router-link>
          </p>
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
            <button type="submit" class="submit-button">Confirmer l'inscription</button>
          </div>
        </form>
      </div>

      <div v-if="userType === 'organisateur'" class="form-box">
        <form @submit.prevent="submitFormOrganisateur" class="form-content">
          <div class="form-group">
            <label for="prenomOrganisateur">Prénom :</label>
            <input type="text" v-model="organisateur.prenom" id="prenomOrganisateur" placeholder="Entrez votre prénom" required>
          </div>
          <div class="form-group">
            <label for="nomOrganisateur">Nom :</label>
            <input type="text" v-model="organisateur.nom" id="nomOrganisateur" placeholder="Entrez votre nom" required>
          </div>
          <div class="form-group">
            <label for="numeroTelephoneOrganisateur">Numéro de téléphone :</label>
            <input type="text" v-model="organisateur.numTelephone" id="numeroTelephoneOrganisateur" placeholder="Entrez votre numéro de téléphone" required>
          </div>
          <div class="form-group">
            <label for="emailOrganisateur">Email :</label>
            <input type="email" v-model="organisateur.email" id="emailOrganisateur" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="confirmEmailOrganisateur">Confirmation de l'email :</label>
            <input type="email" v-model="organisateur.confirmEmail" id="confirmEmailOrganisateur" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="passwordOrganisateur">Mot de passe :</label>
            <input type="password" v-model="organisateur.password" id="passwordOrganisateur" placeholder="Entrez votre mot de passe" required>
          </div>
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="login-link">
            Déjà un compte Creepynight ?
            <router-link to="/connexion" class="link">Connectez-vous</router-link>
          </p>

          <div class="form-actions">
            <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
            <button type="submit" class="submit-button">Confirmer l'inscription</button>
          </div>
        </form>
      </div>

      <div v-if="userType === 'prestataire'" class="form-box">
        <form @submit.prevent="submitFormPrestataire" class="form-content">
          <div class="form-group">
            <label for="societePrestataire">Nom de la société :</label>
            <input type="text" v-model="prestataire.societe" id="societePrestataire" placeholder="Entrez votre société" required>
          </div>
          <div class="form-group">
            <label for="adressePrestataire">Adresse de la société :</label>
            <input type="text" v-model="prestataire.adresse" id="adressePrestataire" placeholder="Entrez l'adresse de la société" required>
          </div>
          <div class="form-group">
            <label for="emailPrestataire">Email :</label>
            <input type="email" v-model="prestataire.email" id="emailPrestataire" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="confirmEmailPrestataire">Confirmation de l'email :</label>
            <input type="email" v-model="prestataire.confirmEmail" id="confirmEmailPrestataire" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="passwordPrestataire">Mot de passe :</label>
            <input type="password" v-model="prestataire.password" id="passwordPrestataire" placeholder="Entrez votre mot de passe" required>
          </div>
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="login-link">
            Déjà un compte Creepynight ?
            <router-link to="/connexion" class="link">Connectez-vous</router-link>
          </p>
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="$router.go(-1)">Annuler</button>
            <button type="submit" class="submit-button">Confirmer l'inscription</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "CreationProfil",
  data: () => ({
    userType: 'utilisateur',
    utilisateur: {
      prenom: '',
      nom: '',
      dateNaissance: '',
      email: '',
      confirmEmail: '',
      password: '',
    },
    organisateur: {
      prenom: '',
      nom: '',
      numTelephone: '',
      email: '',
      confirmEmail: '',
      password: '',
    },
    prestataire: {
      societe: '',
      adresse: '',
      email: '',
      confirmEmail: '',
      password: '',
    },
  }),
  computed: {
    ...mapState('ProfilStore', ['errorMessage']),
  },
  methods: {
    ...mapActions('ProfilStore', ['enregistrementUtilisateur', 'enregistrementOrganisateur', 'enregistrementPrestataire', 'updateErrorMessage']),
    resetForm(type) {
      this.updateErrorMessage('');
      if (type === 'utilisateur') {
        this.utilisateur = { prenom: '', nom: '', dateNaissance: '', email: '', confirmEmail: '', password: '' };
      } else if (type === 'organisateur') {
        this.organisateur = { prenom: '', nom: '', numTelephone: '', email: '', confirmEmail: '', password: '' };
      } else if (type === 'prestataire') {
        this.prestataire = { societe: '', adresse: '', email: '', confirmEmail: '', password: '' };
      }
    },
    async submitFormUtilisateur() {
      const { prenom, nom, dateNaissance, email, confirmEmail, password } = this.utilisateur;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementUtilisateur({ nom, prenom, dateNaissance, email, password });
      console.log(result)
      if (result.success) {
        alert("Votre compte utilisateur est créé");
        await this.$router.push('/connexion');
      }
    },
    async submitFormOrganisateur() {
      const { prenom, nom, numTelephone, email, confirmEmail, password } = this.organisateur;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementOrganisateur({ nom, prenom, numTelephone, email, password });
      if (result.success) {
        alert("Votre compte organisateur est créé");
        await this.$router.push('/connexion');
      }
    },
    async submitFormPrestataire() {
      const { societe, adresse, email, confirmEmail, password } = this.prestataire;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementPrestataire({ societe, adresse, email, password });
      if (result.success) {
        alert("Votre demande a été envoyée !");
        await this.$router.push('/connexion');
      }
    },
  },
};
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

}

.form-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 91vh;
}

.form-box {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.titre-formulaire{
  font-family: 'Creepster', cursive;
  color: #AD0918;
}

h3{
  font-family: 'Creepster', cursive;
  color: #AD0918;
}

.user-type-tabs span {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: #666;
  transition: all 0.3s ease;
}

.user-type-tabs span {
  color: #AD0918;
  border-bottom: 2px solid #AD0918;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #AD0918;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
}

/* Submit Button */
.submit-button {
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #AD0918;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0;
}

.submit-button:hover {
  background-color: #8A0714;
}
.login-link span {
  color: #666;
  margin: 0;
}

.login-link a {
  margin: 0;
  color: #AD0918;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/fond_Accueil.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.form-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cancel-button {
  background-color: #666;
  color: white;
  border: 2px;
  border-color: #AD0918;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
  margin-top: 0;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

.link {
  color: #AD0918;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
.error {
  color: red;
  font-weight: bold;
  margin: 0;
}

.login-link {
  margin: 0;
  padding-top: 0;
  padding-bottom: 8px;
}
.form-actions {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0;
}
</style>