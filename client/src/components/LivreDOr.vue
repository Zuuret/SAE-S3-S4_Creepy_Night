<template>
  <div class="livre-dor" v-if="prestataire">
    <h2>Le livre d'or de {{ prestataire.societe }}</h2>
    <div v-for="message in livreDOr" :key="message.id" class="message">
      <p><strong>{{ message.nomUtilisateur }}</strong> ({{ message.date }})</p>
      <p>{{ message.message }}</p>
      <div class="rating">
        <span v-for="i in message.evaluation" :key="i">⭐</span>
      </div>
    </div>

    <form @submit.prevent="ajouterMessage">
      <h1>Ajouter un commentaire</h1>
      <input v-model="nomUtilisateur" placeholder="Votre nom" required />
      <textarea v-model="message" placeholder="Votre message" required></textarea>
      <input type="number" v-model="evaluation" min="1" max="5" placeholder="Évaluation (1 à 5)" required />
      <button type="submit">Ajouter un message</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      nomUtilisateur: '',
      message: '',
      evaluation: 5,
    };
  },
  computed: {
    ...mapState('PrestataireStore', ['livreDOr']),
    ...mapState('ProfilStore', ['prestataire']),
  },
  methods: {
    ...mapActions('PrestataireStore', ['ajoutCommentaire', 'getLivreDOr']),
    ...mapActions('ProfilStore', ['getPrestairebyId']),
    async ajouterMessage() {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      let formattedDate = date.toLocaleDateString('fr-FR', options);

      const parts = formattedDate.split(' ');
      parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      const newMessage = {
        prestataireId: this.prestataire.id,
        nomUtilisateur: this.nomUtilisateur,
        evaluation: this.evaluation,
        message: this.message,
        date: parts.join(' '),
      };
      await this.ajoutCommentaire(newMessage);

      this.nomUtilisateur = '';
      this.message = '';
      this.evaluation = 5;
    }
  },
  mounted() {
    const prestataireId = parseInt(this.$route.params.id);
    this.getPrestairebyId(prestataireId)
    this.getLivreDOr(prestataireId)
  }
};
</script>

<style scoped>
.livre-dor {
  padding: 20px;
}

.message {
  margin-bottom: 20px;
}

.rating {
  color: gold;
}

form {
  margin-top: 20px;
}

form input,
form textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
}

form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>