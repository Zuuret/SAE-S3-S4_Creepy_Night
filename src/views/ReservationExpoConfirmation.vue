<template>
  <div>
    <h1>Détails du concert</h1>
    <div v-if="concert">
      <img :src="concert.image" alt="Affiche du concert" />
      <h2>{{ concert.artiste }} - {{ concert.categorie }}</h2>
      <p>Date : {{ concert.date }}</p>
      <p>Heure : {{ concert.heure }}</p>
      <p>{{ concert.scene }}</p>
    </div>

    <div v-if="places_concert.length > 0">
      <h3>Places disponibles :</h3>
      <div v-for="place in places_concert" :key="place.id_concert + '-' + place.type_place">
        <p>Type de place : {{ place.type_place }} - Nombre de places : {{ place.nb_places }} - Prix : {{ place.prix_place }} €</p>
        <label :for="`selection_quantite_${place.type_place}`">Quantité :</label>
        <select v-model.number="quantiteParType[place.type_place]">
          <option v-for="n in 7" :key="n" :value="n-1">{{ n-1 }}</option>
        </select>
      </div>
    </div>
    <div v-else>
      <p>Aucune place disponible pour ce concert.</p>
    </div>
    <div>
      <p>Total : {{ prixTotal }}€</p>
    </div>
    <router-link v-if="concert" :to="`/concert/${concert.id}/validate`">
      <button>Obtenir ma place</button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ReservationExpoConfirmation',
  data() {
    return {
      quantiteParType: {},
    };
  },
  computed: {
    ...mapState(['concert', 'places_concert']),
    prixTotal() {
      let total = 0;
      for (const place of this.places_concert) {
        const quantite = this.quantiteParType[place.type_place] || 0;
        total += place.prix_place * quantite;
      }
      return total;
    },
  },
  methods: {
    ...mapActions(['getConcertbyId', 'getPlacesConcerts']),
  },
  mounted() {
    const concertId = parseInt(this.$route.params.id);
    console.log("ID du concert : ", concertId);
    this.getConcertbyId(concertId);
    this.getPlacesConcerts(concertId).then(() => {
      this.places_concert.forEach(place => {
        this.$set(this.quantiteParType, place.type_place, 0);
      });
    });
  },
}
</script>

<style scoped>
/* Style principal du conteneur */
div {
  color: #ff4444;
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
}
/* Titre principal */
h1 {
  color: #ff0000;
  font-size: 2.5rem;
  font-family: 'Creepster', cursive;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}
/* Titre du concert */
h2 {
  color: #ffaaaa;
  font-size: 2rem;
  margin-bottom: 10px;
}
/* Image du concert */
img {
  width: 100%;
  border: 2px solid #ff4444;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
/* Détails du concert */
p {
  font-size: 1.2rem;
  color: #eeeeee;
  margin: 5px 0;
}
/* Select pour la quantité */
select {
  background-color: #222;
  color: #ffaaaa;
  padding: 8px;
  font-size: 1.1rem;
  border: 1px solid #ff4444;
  border-radius: 4px;
  margin-top: 10px;
}
select:focus {
  outline: none;
  box-shadow: 0 0 5px #ff4444;
}
/* Effet de bouton */
button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}
button:hover {
  background-color: #cc0000;
  transform: scale(1.05);
}
button:active {
  background-color: #990000;
  transform: scale(0.95);
}
</style>
