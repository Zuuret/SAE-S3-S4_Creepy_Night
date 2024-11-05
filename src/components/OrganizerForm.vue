<template>
  <div class="organizer-form">
    <form @submit.prevent="handleSubmit">
      <label for="name">Nom</label>
      <input type="text" id="name" v-model="name" required />

      <label for="firstname">Prénom</label>
      <input type="text" id="firstname" v-model="firstname" required />

      <label for="phone">Numéro de téléphone</label>
      <input type="tel" id="phone" v-model="phone" required />

      <label for="email">Adresse email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="organization">Nom de l'organisation</label>
      <input type="text" id="organization" v-model="organization" required />

      <label for="address">Adresse de l'organisation</label>
      <input type="text" id="address" v-model="address" required />

      <label for="website">Site web (optionnel)</label>
      <input type="url" id="website" v-model="website" />

      <label for="description">Description de l'organisateur</label>
      <textarea id="description" v-model="description" rows="4"></textarea>

      <button type="submit">Créer profil organisateur</button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      firstname: "",
      phone: "",
      email: "",
      organization: "",
      address: "",
      website: "",
      description: "",
      successMessage: "", // Message de confirmation
    };
  },
  methods: {
    handleSubmit() {
      // Émet l'événement de création
      const organizerData = {
        name: this.name,
        firstname: this.firstname,
        phone: this.phone,
        email: this.email,
        organization: this.organization,
        address: this.address,
        website: this.website,
        description: this.description,
      };
      this.$emit("submit", organizerData);

      // Réinitialise les champs
      this.name = "";
      this.firstname = "";
      this.phone = "";
      this.email = "";
      this.organization = "";
      this.address = "";
      this.website = "";
      this.description = "";

      // Affiche le message de confirmation
      this.successMessage = "L'organisateur a bien été créé";
      setTimeout(() => {
        this.successMessage = ""; // Cache le message après 3 secondes
      }, 3000);
    },
  },
};
</script>

<style scoped>
.organizer-form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
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