<template>
  <div class="livre-dor" v-if="prestataire">
    <div class="gauche">
      <h2>NOTRE LIVRE D'OR</h2>
      <h3>(Donnez-nous un avis sur notre structure)</h3>
      <form @submit.prevent="ajouterMessage">
        <h1>Ajouter un commentaire</h1>
        <div class="stars">
          <i v-for="i in 5" :key="i" :class="['fa', 'fa-star', { 'gold': i <= tempEvaluation }]" @mouseover="hoverRating(i)" @mouseleave="resetRating" @click="setRating(i)"></i>
        </div>
        <input v-model="nomUtilisateur" placeholder="Votre nom" required />
        <textarea v-model="message" placeholder="Votre message" required></textarea>
        <input type="hidden" v-model="evaluation" />
        <button type="submit">Ajouter un message</button>
      </form>
    </div>

    <div class="droit">
      <div v-if="livreDOr.length === 0" class="no-message">
        <p>Aucun commentaire laissés pour ce prestataire</p>
      </div>
      <div v-else class="message" v-for="message in livreDOr" :key="message.id">
        <p><strong>{{ message.nomUtilisateur }}</strong> ({{ message.date }})</p>
        <p>{{ message.message }}</p>
        <div class="rating">
          <span v-for="i in parseInt(message.evaluation)" :key="i" class="etoile">⭐</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      nomUtilisateur: '',
      message: '',
      evaluation: 0,
      tempEvaluation: 0,
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
      if (!this.evaluation || this.evaluation === 0) {
        await Swal.fire({
          title: 'Erreur',
          text: "Erreur lors de la publication de votre commentaire. Attribuez un nombre d'étoiles valide pour pouvoir le publier.",
          icon: 'error',
          confirmButtonText: 'OK',
          background: '#900c0c',
          color: '#fff',
        });
        return;
      }

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
      this.evaluation = 0;
      this.tempEvaluation = 0;
    },

    hoverRating(rating) {
      this.tempEvaluation = rating;
    },
    resetRating() {
      this.tempEvaluation = this.evaluation;
    },
    setRating(rating) {
      this.evaluation = rating;
      this.tempEvaluation = rating;
    }
  },
  mounted() {
    const prestataireId = parseInt(this.$route.params.id);
    this.getPrestairebyId(prestataireId);
    this.getLivreDOr(prestataireId);
  }
};
</script>

<style scoped>
.livre-dor {
  font-family: Kanit, sans-serif;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 20px;
}

.gauche {
  width: 35%;
  padding: 0 5% 5% 10%;
}

.droit {
  margin-top: 10%;
  width: 35%;
  max-height: 320px;
  overflow-y: auto;
  margin-right: 10%;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.droit::-webkit-scrollbar {
  width: 8px;
}

.droit::-webkit-scrollbar-thumb {
  background-color: #730314;
  border-radius: 10px;
}

.droit::-webkit-scrollbar-thumb:hover {
  background-color: #ba0420;
}

h2 {
  font-size: 45px;
  margin: 0;
}
h3{
  margin: 0 0 25px 0;
}

.message {
  margin: 0 0 5px 0;
  padding: 0 10px 10px 10px;
  background-color: #9f041c;
  border-radius: 10px;
  color: white;
  font-size: 18px;
}

.stars {
  display: flex;
  font-size: 30px;
  margin-bottom: 20px;
  justify-content: center;
}

.stars .fa-star {
  cursor: pointer;
  padding: 0.0625rem;
}

.stars .fa-star.gold {
  color: #9f041c;
}

form {
  display: flex;
  flex-direction: column;
  background-color: #333;
  align-items: center;
  border-radius: 20px;
}

form input,
form textarea {
  justify-content: center;
  width: 70%;
  padding: 10px;
  margin: 0 0 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #222;
  color: white;
  font-family: Kanit, sans-serif;
  resize: none;
}

form button {
  padding: 10px 20px;
  background-color: #9f041c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 25px;
  font-size: 15px;
  font-family: Kanit, sans-serif;
  font-weight: bold;
}

form input:focus,
form textarea:focus {
  border-color: #9f041c;
  outline: none;
}
.no-message {
  text-align: center;
  color: #555;
  font-size: 25px;
  margin-top: 85px;
  font-family: Kanit, sans-serif;
}

</style>