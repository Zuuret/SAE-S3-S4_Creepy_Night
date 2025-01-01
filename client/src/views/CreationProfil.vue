<template>
  <div class="form-container">
    <div class="form-box">
      <h2>Inscription</h2>

      <div class="user-type-tabs">
        <span @click="setUserType('utilisateur')" :class="{ active: userType === 'utilisateur' }">Utilisateur</span>
        <span @click="setUserType('organisateur')" :class="{ active: userType === 'organisateur' }">Organisateur</span>
        <span @click="setUserType('prestataire')" :class="{ active: userType === 'prestataire' }">Prestataire</span>
      </div>

      <form @submit.prevent="submitForm" class="form-content">
        <div v-if="userType === 'utilisateur'">
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
            <label for="confirmEmail">Confirmation de l'email :</label>
            <input type="email" v-model="confirmEmail" id="confirmEmail" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="motDePasse">Mot de passe :</label>
            <input type="password"  v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required>
          </div>
        </div>

        <div v-if="userType === 'organisateur'">
          <div class="form-group">
            <label for="prenom">Prénom :</label>
            <input type="text" v-model="prenom" id="prenom" placeholder="Entrez le prénom de l'organisateur" required>
          </div>
          <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" v-model="nom" id="nom" placeholder="Entrez le nom de l'organisateur" required>
          </div>
          <div class="form-group">
            <label for="numeroTelephone">Numéro de téléphone :</label>
            <input type="text" v-model="numeroTelephone" id="numeroTelephone" placeholder="Entrez votre numéro de téléphone" required>
          </div>
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" v-model="email" id="email" placeholder="Entrez le mail de l'organisateur" required>
          </div>
          <div class="form-group">
            <label for="confirmEmail">Confirmation de l'email :</label>
            <input type="email" v-model="confirmEmail" id="confirmEmail" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="motDePasseOrganisateur">Mot de passe :</label>
            <input type="password" v-model="motDePasse" id="motDePasseOrganisateur" placeholder="Entrez votre mot de passe" required>
          </div>
        </div>

        <div v-if="userType === 'prestataire'">
          <div class="form-group">
            <label for="nom">Nom de la société :</label>
            <input type="text" v-model="nom" id="nom" placeholder="Entrez votre nom de société" required>
          </div>
          <div class="form-group">
            <label for="adresse">Adresse de la société :</label>
            <input type="text" v-model="adresse" id="adresse" placeholder="Entrez l'adresse de la société" required>
          </div>
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" v-model="email" id="email" placeholder="Entrez votre email" required>
          </div>
          <div class="form-group">
            <label for="confirmEmail">Confirmation de l'email :</label>
            <input type="email" v-model="confirmEmail" id="confirmEmail" placeholder="Confirmez votre email" required>
          </div>
          <div class="form-group">
            <label for="motDePasse">Mot de passe :</label>
            <input type="password" v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required>
          </div>
        </div>

        <button type="submit" class="submit-button">Confirmer l'inscription</button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>

      <div class="login-link">
        <span>Déjà un compte ? <router-link to="/connexion">Se connecter</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import { utilisateurs, organisateurs, prestataires } from '@/datasource/data.js';

export default {
  name: "CreationProfil",
  data: () => ({
    userType: 'utilisateur',
    prenom: '',
    nom: '',
    dateNaissance: '',
    email: '',
    confirmEmail: '',
    motDePasse: '',
    numeroTelephone: '',
    adresse: '',
    message: ''
  }),
  methods: {
    setUserType(type) {
      this.userType = type;
      this.resetFields();
    },
    resetFields() {
      this.prenom = '';
      this.nom = '';
      this.dateNaissance = '';
      this.email = '';
      this.confirmEmail = '';
      this.motDePasse = '';
      this.numeroTelephone = '';
      this.adresse = '';
    },
    submitForm() {
      // Vérification de l'email existant
      const emailExistsAsUser = utilisateurs.some(user => user.email === this.email);
      const emailExistsAsOrganizer = organisateurs.some(org => org.email === this.email);
      const emailExistsAsPrestataire = prestataires.some(p => p.email === this.email);

      if (emailExistsAsUser || emailExistsAsOrganizer || emailExistsAsPrestataire) {
        this.message = `L'adresse email possède déjà un compte ${emailExistsAsOrganizer ? 'organisateur' : emailExistsAsUser ? 'utilisateur' : 'prestataire'}.`;
        return; // Sortir de la fonction si l'email existe déjà
      }

      if (this.userType === 'utilisateur') {
        if (this.email !== this.confirmEmail) {
          this.message = "L'email n'est pas identique à l'email de confirmation";
        } else {
          const newUser = {
            id: utilisateurs.length + 1,
            prenom: this.prenom,
            nom: this.nom,
            dateNaissance: this.dateNaissance,
            email: this.email,
            motDePasse: this.motDePasse,
            solde: 0,
            numCashless: Math.floor(Math.random() * 1000000000)
          };
          utilisateurs.push(newUser);
          this.message = `Nouvel utilisateur ajouté : ${this.prenom} ${this.nom}`;
          this.resetFields();
        }
      } else if (this.userType === 'organisateur') {
        if (this.email !== this.confirmEmail) {
          this.message = "L'email n'est pas identique à l'email de confirmation";
        } else {
          const newOrganisateur = {
            id: organisateurs.length + 1,
            prenom: this.prenom,
            nom: this.nom,
            email: this.email,
            motDePasse: this.motDePasse,
            numeroTelephone: this.numeroTelephone
          };
          organisateurs.push(newOrganisateur);
          this.message = `Nouvel organisateur ajouté : ${this.prenom} ${this.nom}`;
          this.resetFields();
        }
      } else if (this.userType === 'prestataire') {
        if (this.email !== this.confirmEmail) {
          this.message = "L'email n'est pas identique à l'email de confirmation";
        } else {
          const newPrestataire = {
            id: prestataires.length + 1,
            société: this.nom,
            adresse: this.adresse,
            email: this.email,
            motDePasse: this.motDePasse
          };
          prestataires.push(newPrestataire);
          this.message = `Nouveau prestataire ajouté : ${this.nom}`;
          this.resetFields();
        }
      }
    }
  }
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

/* Tabs for user type */
.user-type-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

.user-type-tabs span.active {
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

/* Message */
.message {
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  background-color: #e7f3ff;
  color: #007BFF;
  border: 1px solid #b3d7ff;
  border-radius: 4px;
}

/* Login link */
.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
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
