<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <h1>Calendrier des films</h1>
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-hour"></div>
        <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
      </div>
      <div class="calendar-body">
        <div v-for="hour in hours" :key="hour" class="calendar-row">
          <div class="calendar-hour">{{ hour }}</div>
          <div v-for="day in days" :key="day" class="calendar-cell">
            <div v-if="!filmsByDayAndHour[day][hour]" class="empty-cell">
              <p class="placeholder-text">À venir</p>
            </div>
            <div v-if="filmsByDayAndHour[day][hour]" class="concert-card">
              <router-link :to="`/cinepeur/${filmsByDayAndHour[day][hour].id}`">
                <img class="concert-img" :src="filmsByDayAndHour[day][hour].image" alt="Affiche du concert" />
                <p class="nomArtiste">{{ filmsByDayAndHour[day][hour].nomFilm }}</p>
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
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

h1 {
  text-align: center;
  font-size: 2.5em;
  font-family: 'Creepster', cursive;
  letter-spacing: 2px;
  color: #ff4444;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.3);
  margin-bottom: 20px;
}

.calendar {
  margin-right: 35px;
  margin-top: 65px;
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  gap: 5px;
  justify-content: center;
}

.calendar-header {
  display: contents;
  font-weight: bold;
  font-size: 20px;
}

.calendar-hour {
  text-align: right;
  font-weight: bold;
  font-size: 20px;
  padding-right: 20px;
}

.calendar-body {
  display: contents;
}

.calendar-row {
  display: contents;
}

.calendar-cell {
  border: 2px solid black;
  border-radius: 8px;
  position: relative;
  max-height: 200px;
}

.concert-card {
  width: 100%;
  height: 100%;
  color: #fff;
  border: 1px solid #ff4444;
  border-radius: 7px;
  box-sizing: border-box;
}

.concert-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(60%) brightness(80%);
  margin-bottom: 5px;
  border-radius: 6px;
  transition: filter 0.3s;
}

.nomArtiste {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  font-family: 'Creepster', cursive;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 6px rgba(255, 0, 0, 0.7);
  pointer-events: none;
}

.concert-card:hover {
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.7), 0 0 15px rgb(0, 0, 0);
}

.concert-img:hover {
  filter: grayscale(0%) brightness(100%);
}

.empty-cell {
  background-color: #e66666;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  box-sizing: border-box;
}

.placeholder-text {
  position: absolute;
  font-family: 'Creepster', cursive;
  color: rgb(0, 0, 0);
  text-shadow: 0 0 20px rgb(0, 0, 0);
  font-size: 25px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>