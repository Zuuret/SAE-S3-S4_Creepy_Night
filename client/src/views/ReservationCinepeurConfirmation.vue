<template>
  <div style="margin-top: 150px">
    <NavBar />
    <div v-if="utilisateurConnecte == null">
      <h1>Veuillez vous connecter :</h1>
      <router-link :to="`/cinepeur/`">
        <button style="margin-top: 10px">Retour</button>
      </router-link>
      <router-link :to="`/connexion/`">
        <button style="margin-top: 10px">Se Connecter</button>
      </router-link>
    </div>
    <div v-else>
      <h1 class="bordure">Détails du film</h1>
      <img :src="filmById.image" alt="Affiche du film" />
      <div v-if="filmById" class="bordure">
        <h2>{{ filmById.nomFilm }}</h2>
        <p>Date : {{ filmById.date }}</p>
        <p>Heure : {{ filmById.heure }}</p>
        <p>{{ filmById.salle }}</p>
      </div>

      <div v-if="places_film.length > 0" class="bordure">
        <h3>Places disponibles :</h3>
        <div v-for="place in places_film" :key="place.id">
          <p>Type de place : {{ place.type_place }}</p>
          <p>Nombre de places : {{ place.nb_places }}</p>
          <p>Prix : {{ place.prix_place }} €</p>
          <div>
            <p v-if="utilisateurConnecte !== null">Votre Cashless : {{ prixCashless }} €</p>
            <label :for="`selection_quantite_${place.type_place}`">
              Quantité :
            </label>
            <select v-model.number="quantiteParType[place.type_place]">
              <option v-for="n in 7" :key="n" :value="n-1">{{ n-1 }}</option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="places_film.length <= 0" class="bordure">
        <p>Aucune place disponible pour ce film.</p>
      </div>
      <div class="bordure">
        <p>Total : {{ prixTotal }}€</p>
        <router-link v-if="prixTotal !== 0 && utilisateurConnecte.solde >= prixTotal" :to="`/cinepeur/`">
          <button @click="setPlaceFilm([utilisateurConnecte.id, filmById.id, quantiteParType['Fosse'], prixTotal, filmById.nomFilm])">Obtenir ma place</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ReservationCinepeurConfirmation',
  components: {NavBar},
  data() {
    return {
      quantiteParType: {},
    };
  },
  computed: {
    ...mapState('ProfilStore',['utilisateurConnecte']),
    ...mapState('CinemaStore',['filmById', 'places_film']),
    prixTotal() {
      let total = 0;
      for (const place of this.places_film) {
        const quantite = this.quantiteParType[place.type_place] || 0;
        total += place.prix_place * quantite;
      }
      return total;
    },
    prixCashless() {
      return Math.round(this.utilisateurConnecte.solde);
    },
  },
  methods: {
    ...mapActions('CinemaStore',['getFilmById', 'getPlacesFilms', 'setPlaceFilm']),
  },
  mounted() {
    const filmId = parseInt(this.$route.params.id);
    console.log("ID du film : ", filmId);
    this.getFilmById(filmId);
    this.getPlacesFilms(filmId).then(() => {
      this.places_film.forEach(place => {
        this.$set(this.quantiteParType, place.type_place, 0);
      });
    });
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 10px;
  text-decoration: none;
}

/* Style principal du conteneur */
div {
  color: #ff4444;
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.bordure {
  background-color: #151515;
  border: 1px solid red;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
  border-radius: 8px;
}

/* Titre principal */
h1 {
  color: #ff0000;
  font-size: 2.5rem;
  font-family: 'Creepster', cursive;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}
/* Titre du film */
h2 {
  color: #ffaaaa;
  font-size: 2rem;
  margin-bottom: 10px;
}
/* Image du film */
img {
  width: 100%;
  border: 2px solid #ff4444;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
/* Détails du film */
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
