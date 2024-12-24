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
            <label for="nom">Nom de l'organisateur :</label>
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
            <input type="password" v-model="motDePasse" id="motDePasse" placeholder="Entrez votre mot de passe" required>
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
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
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
  computed: {
    ...mapState(['utilisateurs']),
  },
  methods: {
    ...mapActions(['enregistrementUtilisateur']),
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
      if (this.email != this.confirmEmail) {
        this.message = "L'email n'est pas identique à l'email de confirmation"
      } else {
        this.message = `Nouvel utilisateur ajouté : ${this.prenom} ${this.nom}`;
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