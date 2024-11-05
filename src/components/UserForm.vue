<template>
  <div class="user-form">
    <form @submit.prevent="handleSubmit">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Créer profil utilisateur</button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      successMessage: "", // Message de confirmation
    };
  },
  methods: {
    handleSubmit() {
      // Émet l'événement de création
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$emit("submit", userData);

      // Réinitialise les champs
      this.username = "";
      this.email = "";
      this.password = "";

      // Affiche le message de confirmation
      this.successMessage = "L'utilisateur a bien été créé";
      setTimeout(() => {
        this.successMessage = ""; // Cache le message après 3 secondes
      }, 3000);
    },
  },
};
</script>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #d40813;
}

.success-message {
  margin-top: 15px;
  color: #28a745;
  font-weight: bold;
}
</style>