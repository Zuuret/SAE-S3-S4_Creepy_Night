<template>
  <div class="body item flex-column ">
    <div><NavBar /></div>
    <h1 class="item">Calendrier des films</h1>
    <div class="item flex-row">
      <div class="item flex-column" style="margin-bottom: 20px;"><div v-for="hour in hours" :key="hour" class="item heures"><p>{{ hour }}</p></div></div>
      <div class="grille bordure">
        <div v-for="day in days" :key="day" class=""><p class="item">{{ day }}</p>
          <div v-for="hour in hours" :key="hour" class="item flex-row bordure">
            <div v-if="!filmsByDayAndHour[day][hour]" class="case">
              <p>À venir</p>
            </div>
            <div v-if="filmsByDayAndHour[day][hour]" class="item">
              <router-link :to="`/cinepeur/${filmsByDayAndHour[day][hour].id}`">
                <img :src="filmsByDayAndHour[day][hour].image" alt="Affiche du concert" />
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
    ...mapState(['films']),
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
    ...mapActions(['getFilms']),
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

.body {
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: black;
  border: 5px solid lightgray;
}

.bordure {border: 1px solid white;}

.nav {display: flex; align-items: center;}

.item {display: flex; padding: 10px; text-align: center}
.grille {
  display: grid;
  grid-template-columns: 128px 128px 128px  auto auto auto auto;
  gap: 20px;
  padding: 10px;
  grid: auto auto auto auto;
}
.flex-row {flex-direction: row;}
.flex-column {flex-direction: column;}
.margin-inline{margin-inline: 40%;}
.between{justify-content: space-between;}
.center{justify-content: center;}
.around{justify-content: space-around;}
.evenly{justify-content: space-evenly;}

.item a {
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  margin: 5px;
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
}

.item a:hover {
  background-color: #0F0F0F;
  border: 1px solid red;
}

.item img {
  width: 100%;
}

.heures {
  margin-top: 80px;
}

.case {
  padding-block : 100px;
}

.filtre {
  text-align: center;
  vertical-align: middle;
  margin: 5px;
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
}

.filtre:hover {
  background-color: grey;
  color: white;
  border: 1px solid grey;
}

h1,h2,h3,h4,h5,h6,p {
  color: red;
}

@media (min-width: 1025px) {
  .body {
    margin: 0% 0% 0% 0%;
    orientation: landscape;
  }

  .main {
    margin: 80px 20% 0% 20%;
  }

  .nav-item{margin-left: 14%;}

  .flex-row{flex-direction: row;}
  .flex-column{flex-direction: column;}

  .justify-content-center{justify-content: center;}
  .justify-content-space-between{justify-content: space-between;}
  .justify-content-space-around{justify-content: space-around;}
  .justify-content-space-evenly{justify-content: space-evenly;}

  .load {border: 1px solid black; padding-inline: 100px;}
  .align-right {margin-left: 70%;}
  .image-width{width: 100px;}
}

@media (min-width: 769px) and (max-width: 1024px) {
  .body {
    margin: 0% 0% 0% 0%;
    orientation: landscape;
  }

  .main{
    margin: 80px 0% 0% 0%;
  }

  .nav-item{margin-inline: 14%;}

  .flex-row{flex-direction: row;}
  .flex-column{flex-direction: column;}

  .justify-content-center{justify-content: center;}
  .justify-content-space-between{justify-content: space-between;}
  .justify-content-space-around{justify-content: space-around;}
  .justify-content-space-evenly{justify-content: space-evenly;}

  .load {border: 1px solid black; padding-inline: 100px;}
  .align-right {margin-left: 70%;}
  .image-width{width: 100%}
}

@media (max-width: 768px) {
  .body {
    margin: 0% 0% 0% 0%;
    orientation: portrait;
  }

  main {margin: 80px 0% 0% 0%;}

  .nav-item{margin-inline: 50%;}

  .flex-row{flex-direction: column;}
  .flex-column{flex-direction: row;}

  .load {border: 1px solid black; margin-inline: 40%;}
  .center {justify-content: center;}
  .center-bot {margin-inline: 30%;}
  .align-right {margin-inline: 30%;}
  .image-width {width: 100%}
}
</style>