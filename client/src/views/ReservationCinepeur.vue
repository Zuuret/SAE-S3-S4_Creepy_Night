<template>
  <div class="body">
    <!-- Barre de Navigation -->
    <div><NavBar /></div>

    <!-- Titre -->
    <h1>Calendrier des films</h1>

    <!-- Contenu principal -->
    <div class="flex-row">

      <!-- Colonne des heures -->
      <div class="flex-column" style="margin-top: 43px">
        <div
            v-for="hour in hours"
            :key="hour"
            class="heures bordure"
        >
          <p>{{ hour }}</p>
        </div>
      </div>

      <!-- Grille des films -->
      <div class="grille">
        <div v-for="day in days" :key="day">
          <!-- En-tête de jour -->
          <p>{{ day }}</p>

          <!-- Cellules horaires -->
          <div v-for="hour in hours" :key="hour" class="bordure">
            <!-- Cellule vide -->
            <div
                v-if="!filmsByDayAndHour[day][hour]"
                class="case"
            >
              <p>À venir</p>
            </div>

            <!-- Cellule occupée -->
            <div v-if="filmsByDayAndHour[day][hour]" class="item">
              <router-link :to="`/cinepeur/${filmsByDayAndHour[day][hour].id}`">
                <img :src="filmsByDayAndHour[day][hour].image" alt="Affiche du concert"/>
                <p>{{ filmsByDayAndHour[day][hour].nomFilm }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ReservationCinepeur',
  components: {NavBar},
  data() {
    return {
      days: this.getLastWeekOfOctober(),
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'],
    };
  },
  computed: {
    ...mapState('CinemaStore',['films']),
    filmsByDayAndHour() {
      const filmsByDayAndHour = {};
      this.days.forEach(day => {
        filmsByDayAndHour[day] = {};
        this.hours.forEach(hour => {
          filmsByDayAndHour[day][hour] = null;
        });
      });
      this.films.forEach(film => {
        const filmDate = new Date(film.date);
        const filmDay = filmDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        const filmHour = film.heure.split('h')[0] + ':00';
        if (this.days.includes(filmDay)) {
          filmsByDayAndHour[filmDay][filmHour] = film;
        }
      });

      return filmsByDayAndHour;
    }
  }
  ,
  methods: {
    ...mapActions('CinemaStore',['getFilms']),
    getLastWeekOfOctober() {
      let year;
      if (new Date().getMonth() === 11 || new Date().getMonth() === 10) {
        year = new Date().getFullYear() + 1;
      } else {
        year = new Date().getFullYear();
      }
      const lastDayOfOctober = new Date(year, 9, 31);
      const lastWeek = [];

      // Find the Monday of the week that includes October 31st
      while (lastDayOfOctober.getDay() !== 1) {
        lastDayOfOctober.setDate(lastDayOfOctober.getDate() - 1);
      }

      // Add days from Monday to Sunday
      for (let i = 0; i < 7; i++) {
        lastWeek.push(lastDayOfOctober.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }));
        lastDayOfOctober.setDate(lastDayOfOctober.getDate() + 1);
      }

      return lastWeek;
    }
  },
  mounted() {
    this.getFilms();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

/* Corps principal */
.body {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: black;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: darkred;
  margin-block: 40px;
}

/* Conteneur global des jours et heures */
.flex-row {
  text-decoration: none;
  display: flex;
  flex-direction: row;
}

.flex-column {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

/* Colonne des heures */
.heures {
  background-color: black;
  text-align: center;
  color: darkred;
  font-weight: bold;
  padding-inline: 10px;
  height: 150px;
  border: 1px solid darkred;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
  flex: none; /* Taille fixe */
}

/* Grille principale */
.grille {
  text-decoration: none;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 jours */
  grid-auto-rows: 150px; /* Hauteur uniforme pour chaque cellule */
  gap: 5px;
  margin-left: 10px; /* Sépare la grille des heures */
  background-color: black;
  border: 1px solid darkred;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
}

/* En-tête des jours */
.grille > div > p {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background-color: black;
  color: darkred;
  border: 1px solid darkred;
  box-shadow: 0 0 15px rgba(255, 0.5, 0.5, 0.6);
}

/* Cellules */
.case, .item {
  height: 150px; /* Taille uniforme */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid darkred;
}

/* Cellules "À venir" */
.case {
  font-size: 0.9rem;
  color: darkred;
  font-style: italic;
}

/* Cellules occupées */
.item img {
  max-width: 7rem;
  border-radius: 4px;
}

.item a {
  text-decoration: none;
}

.item p {
  margin-top: 5px;
  font-size: 80%;
  text-align: center;
  font-weight: bold;
  color: red;
}

/* Effet au survol */
.case:hover {
  background-color: #0F0F0F;
}

.item:hover {
  background-color: #0F0F0F;
  transform: scale(1.08);
  transition: transform 0.2s ease;
}

/* Responsivité */
@media (max-width: 768px) {
  .grille {
    grid-template-columns: repeat(2, 1fr); /* Affiche 2 jours par ligne */
    gap: 10px;
  }

  .heures {
    font-size: 0.8rem;
    padding: 5px;
  }

  .case, .item {
    height: 120px; /* Réduisez la taille pour les petits écrans */
  }
}

</style>