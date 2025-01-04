<template>
  <div class="form-container">
    <!-- Sélecteur de type d'utilisateur avec boutons radio -->
    <div class="user-type-selector">
      <h3>Choisissez votre rôle :</h3>
      <div class="radio-buttons">
        <label class="custom-radio" :class="{ selected: userType === 'utilisateur' }">
          <input type="radio" name="userType" value="utilisateur" v-model="userType" @change="resetForm">
          <span>👤 Utilisateur</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'organisateur' }">
          <input type="radio" name="userType" value="organisateur" v-model="userType" @change="resetForm">
          <span>🎤 Organisateur</span>
        </label>
        <label class="custom-radio" :class="{ selected: userType === 'prestataire' }">
          <input type="radio" name="userType" value="prestataire" v-model="userType" @change="resetForm">
          <span>💼 Prestataire</span>
        </label>
      </div>
    </div>

    <div v-if="userType === 'utilisateur'" class="form-box">
      <h2>Inscription - Utilisateur</h2>
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
          <label for="motDePasseUtilisateur">Mot de passe :</label>
          <input type="password" v-model="utilisateur.motDePasse" id="motDePasseUtilisateur" placeholder="Entrez votre mot de passe" required>
        </div>
        <button type="submit" class="submit-button">Confirmer l'inscription</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <div v-if="userType === 'organisateur'" class="form-box">
      <h2>Inscription - Organisateur</h2>
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
          <label for="motDePasseOrganisateur">Mot de passe :</label>
          <input type="password" v-model="organisateur.motDePasse" id="motDePasseOrganisateur" placeholder="Entrez votre mot de passe" required>
        </div>
        <button type="submit" class="submit-button">Confirmer l'inscription</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <div v-if="userType === 'prestataire'" class="form-box">
      <h2>Inscription - Prestataire</h2>
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
          <label for="motDePassePrestataire">Mot de passe :</label>
          <input type="password" v-model="prestataire.motDePasse" id="motDePassePrestataire" placeholder="Entrez votre mot de passe" required>
        </div>
        <button type="submit" class="submit-button">Confirmer l'inscription</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
      motDePasse: '',
    },
    organisateur: {
      prenom: '',
      nom: '',
      numTelephone: '',
      email: '',
      confirmEmail: '',
      motDePasse: '',
    },
    prestataire: {
      societe: '',
      adresse: '',
      email: '',
      confirmEmail: '',
      motDePasse: '',
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
        this.utilisateur = { prenom: '', nom: '', dateNaissance: '', email: '', confirmEmail: '', motDePasse: '' };
      } else if (type === 'organisateur') {
        this.organisateur = { prenom: '', nom: '', numTelephone: '', email: '', confirmEmail: '', motDePasse: '' };
      } else if (type === 'prestataire') {
        this.prestataire = { societe: '', adresse: '', email: '', confirmEmail: '', motDePasse: '' };
      }
    },
    async submitFormUtilisateur() {
      const { prenom, nom, dateNaissance, email, confirmEmail, motDePasse } = this.utilisateur;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementUtilisateur({ nom, prenom, dateNaissance, email, motDePasse });
      if (result.success) {
        alert("Votre compte utilisateur est créé");
        await this.$router.push('/connexion');
      }
    },
    async submitFormOrganisateur() {
      const { prenom, nom, numTelephone, email, confirmEmail, motDePasse } = this.organisateur;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementOrganisateur({ nom, prenom, numTelephone, email, motDePasse });
      if (result.success) {
        alert("Votre compte organisateur est créé");
        await this.$router.push('/connexion');
      }
    },
    async submitFormPrestataire() {
      const { societe, adresse, email, confirmEmail, motDePasse } = this.prestataire;
      if (email !== confirmEmail) {
        this.updateErrorMessage('Les adresses email ne correspondent pas');
        return;
      }
      const result = await this.enregistrementPrestataire({ societe, adresse, email, motDePasse });
      if (result.success) {
        alert("Votre compte prestataire est créé");
        await this.$router.push('/connexion');
      }
    },
  },
};
</script>


<style scoped>
/* Global Styles */
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

/* Container for the form */
.form-container {
  width: 100%;
  max-width: 400px;
  margin: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.form-box {
  padding: 20px;
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
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
  color: #007BFF;
  border-bottom: 2px solid #007BFF;
}

/* Form styles */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
}

/* Submit Button */
.submit-button {
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.login-link span {
  color: #666;
}

.login-link a {
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
