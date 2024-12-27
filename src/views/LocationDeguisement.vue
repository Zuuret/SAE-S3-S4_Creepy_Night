<template>
  <div class="location-deguisement">
    <div v-if="deguisement">
      <img :src="deguisement.image" alt="Affiche du déguisement" class="affiche-deguisement" />
      <p class="nom-costume">{{ deguisement.nom_costume }}</p>
      <p class="prix-costume">{{ deguisement.prix }} €</p>
    </div>

    <div v-if="taille_deguisements && taille_deguisements.length > 0">
      <label for="taille-select">Choisir une taille :</label>
      <select id="taille-select" v-model="selectedTaille">
        <option v-for="taille in taille_deguisements" :key="taille.taille" :value="taille.taille">
          {{ taille.taille }} (Stock : {{ taille.quantite }})
        </option>
      </select>
    </div>

    <div v-else>
      <p>Aucune taille disponible pour ce déguisement.</p>
    </div>

    <button @click="ajouterAuPanier" :disabled="!selectedTaille || stockRestant === 0">
      Ajouter au panier
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LocationDeguisement",
  data() {
    return {
      selectedTaille: null,
    };
  },
  computed: {
    ...mapState('BaltrouilleStore', ['deguisement', 'taille_deguisements']),
    stockRestant() {
      if (this.taille_deguisements && this.selectedTaille) {
        const selectedOption = this.taille_deguisements.find(option => option.taille === this.selectedTaille);
        return selectedOption ? selectedOption.quantite : 0;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('BaltrouilleStore', ['getDeguisementById', 'getTailleDeguisement']),
    ajouterAuPanier() {
      if (this.selectedTaille && this.stockRestant > 0) {
        alert(`Déguisement ajouté au panier : Taille ${this.selectedTaille}`);
        // Appelle une méthode Vuex pour mettre à jour le panier (si nécessaire)
      } else {
        alert("Impossible d'ajouter au panier. Stock insuffisant.");
      }
    },
  },
  mounted() {
    const deguisementId = parseInt(this.$route.params.id);
    console.log("ID du déguisement :", deguisementId);
    this.getDeguisementById(deguisementId);
    this.getTailleDeguisement(deguisementId);
  },
};
</script>

<style scoped>
.location-deguisement {
  text-align: center;
  padding: 20px;
}

.affiche-deguisement {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.nom-costume {
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

.prix-costume {
  font-size: 1.2em;
  margin: 5px 0 20px;
}

select {
  margin: 10px 0;
  padding: 5px;
  font-size: 1em;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
