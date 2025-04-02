<template>
  <div class="location-deguisement">
    <div v-if="deguisement" class="deguisement-info">
      <img :src="deguisement.image" :alt="$t('costumePoster')" class="affiche-deguisement" />
      <p class="nom-costume">{{ deguisement.nom_costume }}</p>
      <p class="prix-costume">{{ deguisement.prix }} €</p>
    </div>

    <div v-if="taille_deguisement && taille_deguisement.length > 0" class="taille-select-container">
      <label for="taille-select" class="label-taille">{{ $t('chooseSize') }}</label>
      <select id="taille-select" v-model="selectedTaille" class="taille-select">
        <option v-for="taille in taille_deguisement" :key="taille.taille" :value="taille.taille">
          {{ taille.taille }} ({{ $t('stock') }} : {{ taille.quantite }})
        </option>
      </select>
    </div>
    <div v-else class="no-size-message">
      <p>{{ $t('noSizeAvailable') }}</p>
    </div>

    <button @click="ajouterAuPanier" :disabled="!selectedTaille || stockRestant === 0" class="btn-ajouter">
      {{ $t('addToCart') }}
    </button>
    <router-link to="/cashless">
      {{ $t('goToCashless') }}
    </router-link>
    <router-link to="/reservations/baltrouille">
      {{ $t('viewReservations') }}
    </router-link>
    <PanierDeguisement :panier="panier" />
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
import PanierDeguisement from "@/components/PanierDeguisement.vue";

export default {
  name: "LocationDeguisement",
  components: { PanierDeguisement },
  data() {
    return {
      selectedTaille: 'XS',
    };
  },
  computed: {
    ...mapState('BaltrouilleStore', ['deguisement', 'taille_deguisement', 'panier']),
    stockRestant() {
      if (this.taille_deguisement && this.selectedTaille) {
        const selectedOption = this.taille_deguisement.find(option => option.taille === this.selectedTaille);
        return selectedOption ? selectedOption.quantite : 0;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('BaltrouilleStore', ['getDeguisementById', 'getTailleDeguisementById', 'addDeguisementPanier']),
    ajouterAuPanier() {
      if (this.selectedTaille && this.stockRestant > 0) {
        const deguisementAvecTaille = {
          ...this.deguisement,
          taille: this.selectedTaille,
        };
        this.addDeguisementPanier(deguisementAvecTaille);
        alert(`Déguisement ajouté au panier : Taille ${this.selectedTaille}`);
      } else {
        alert("Impossible d'ajouter au panier. Stock insuffisant.");
      }
    },
  },
  mounted() {
    const deguisementId = parseInt(this.$route.params.deguisementId);
    console.log("ID du déguisement :", deguisementId);
    this.getDeguisementById(deguisementId);
    this.getTailleDeguisementById(deguisementId);
  },
};
</script>

<style scoped>
.location-deguisement {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.deguisement-info {
  margin-bottom: 20px;
}

.affiche-deguisement {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.nom-costume {
  font-size: 1.8em;
  font-weight: 600;
  color: #333;
  margin: 15px 0 5px;
}

.prix-costume {
  font-size: 1.4em;
  font-weight: 500;
  color: #e60000;
  margin-bottom: 20px;
}

.taille-select-container {
  margin-bottom: 20px;
}

.label-taille {
  font-size: 1.2em;
  margin-bottom: 10px;
  display: block;
}

.taille-select {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.no-size-message {
  color: #e60000;
  font-size: 1.2em;
  margin-top: 15px;
}

.btn-ajouter {
  padding: 12px 25px;
  font-size: 1.1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-ajouter:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-ajouter:hover:enabled {
  background-color: #0056b3;
}
</style>
