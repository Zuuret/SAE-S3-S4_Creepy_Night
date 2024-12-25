<template>
  <div>
    <div v-if="concert">
      <p class="nom_artiste">{{ concert.artiste }}</p>
      <p class="categorie_artiste">{{ concert.categorie }} - {{concert.nationalite}}</p>
      <p class="info_concert">{{ concert.date }} - {{ concert.heure }}</p>
      <p class="scene_concert">{{ concert.scene }}</p>
      <img :src="concert.image" alt="Affiche du concert" class="affiche_concert"/>
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
  name: 'ReservationConcertConfirmation',
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
p {
  position: absolute;
}
.nom_artiste {
  margin: 35px 0 0 35px;
  font-size: 80px;
  text-transform: uppercase;
  font-family: Blippo, fantasy;
}
.categorie_artiste {
  margin: 125px 0 0 35px;
  font-size: 50px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
}
.info_concert {
  margin: 185px 0 0 35px;
  font-size: 35px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
}
.scene_concert {
  margin: 230px 0 0 35px;
  font-size: 35px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
}
.affiche_concert {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h3 {
  margin: 35px 50px 0 0;
  font-size: 24px;
  color: #e63946;
  margin: 20px 0;
  text-align: center;
  position: absolute;
}

.place-info {
  margin: 20px 35px 10px;
  font-size: 16px;
  line-height: 1.5;
}

label {
  font-size: 14px;
  margin-right: 10px;
}

select {
  padding: 5px;
  font-size: 14px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* Section Total */
.total {
  margin: 30px 35px;
  font-size: 20px;
  font-weight: bold;
  color: #e63946;
}

/* Bouton */
button {
  background-color: #1d3557;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #457b9d;
}

/* Centrer le bouton */
.router-link {
  text-align: center;
  display: block;
  margin-top: 20px;
}
</style>
