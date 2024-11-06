<template>
  <div class="form-container">

    <div class="form-box">

      <h2>Inscription</h2>

      <div class="user-type-tabs">
        <span @click="setUserType('Utilisateur')" :class="{ active: userType === 'Utilisateur' }">Utilisateur</span>
        <span @click="setUserType('Organisateur')" :class="{ active: userType === 'Organisateur' }">Organisateur</span>
        <span @click="setUserType('Prestataire')" :class="{ active: userType === 'Prestataire' }">Prestataire</span>
      </div>

      <form @submit.prevent="submitForm" class="form-content">
        <!-- User fields (arranged in a column) -->
        <div v-if="userType === 'Utilisateur'">
          <div class="form-group">
            <label>Prénom :</label>
            <input type="text" placeholder="Entrez votre prénom" v-model="form.prenom" />
          </div>

          <div class="form-group">
            <label>Nom :</label>
            <input type="text" placeholder="Entrez votre nom" v-model="form.nom" />
          </div>

          <div class="form-group">
            <label>Date de naissance :</label>
            <input type="date" placeholder="jj/mm/aaaa" v-model="form.dateNaissance" />
          </div>

          <div class="form-group">
            <label>Email :</label>
            <input type="email" placeholder="Entrez votre email" v-model="form.email" />
          </div>

          <div class="form-group">
            <label>Confirmation de l'email :</label>
            <input type="email" placeholder="Confirmez votre email" v-model="form.confirmEmail" />
          </div>

          <div class="form-group">
            <label>Mot de passe :</label>
            <input type="password" placeholder="Entrez votre mot de passe" v-model="form.password" />
          </div>
        </div>

        <!-- Organizer fields -->
        <div v-if="userType === 'Organisateur'">
          <div class="form-group">
            <label>Nom de l'organisateur :</label>
            <input type="text" placeholder="Entrez le nom de l'organisateur" v-model="form.organizerName" />
          </div>

          <div class="form-group">
            <label>Email :</label>
            <input type="email" placeholder="Entrez votre email" v-model="form.email" />
          </div>

          <div class="form-group">
            <label>Confirmation de l'email :</label>
            <input type="email" placeholder="Confirmez votre email" v-model="form.confirmEmail" />
          </div>

          <div class="form-group">
            <label>Mot de passe :</label>
            <input type="password" placeholder="Entrez votre mot de passe" v-model="form.password" />
          </div>

          <div class="form-group">
            <label>Numéro de téléphone :</label>
            <input type="text" placeholder="Entrez votre numéro de téléphone" v-model="form.phoneNumber" />
          </div>
        </div>

        <!-- Provider fields -->
        <div v-if="userType === 'Prestataire'">
          <div class="form-group">
            <label>Nom de la société :</label>
            <input type="text" placeholder="Entrez le nom de la société" v-model="form.companyName" />
          </div>

          <div class="form-group">
            <label>Email :</label>
            <input type="email" placeholder="Entrez votre email" v-model="form.email" />
          </div>

          <div class="form-group">
            <label>Confirmation de l'email :</label>
            <input type="email" placeholder="Confirmez votre email" v-model="form.confirmEmail" />
          </div>

          <div class="form-group">
            <label>Mot de passe :</label>
            <input type="password" placeholder="Entrez votre mot de passe" v-model="form.password" />
          </div>

          <div class="form-group">
            <label>Adresse de la société :</label>
            <input type="text" placeholder="Entrez l'adresse de la société" v-model="form.companyAddress" />
          </div>
        </div>

        <button type="submit" class="submit-button">Confirmer l'inscription</button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userType: 'Utilisateur',  // Default user type
      form: {
        prenom: 'matheo',
        nom: 'rose',
        dateNaissance: '17/03/2005',
        email: 'matheo@gmail.com',
        confirmEmail: 'matheo@gmail.com',
        password: 'a',
        organizerName: '',
        phoneNumber: '',
        companyName: '',
        companyAddress: ''
      },
      message: ''
    };
  },
  methods: {
    setUserType(type) {
      this.userType = type;
      this.form = {
        prenom: '',
        nom: '',
        dateNaissance: '',
        email: '',
        confirmEmail: '',
        password: '',
        organizerName: '',
        phoneNumber: '',
        companyName: '',
        companyAddress: ''
      };
    },
    submitForm() {
      if ( this.form.email != this.form.confirmEmail){
        this.message = "L'email n'est pas identique à l'email de confirmation"
      } else {
        this.message = `Nouvel utilisateur ajouté : ${this.form.prenom} ${this.form.nom}`;
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