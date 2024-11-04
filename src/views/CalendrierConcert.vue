<template>
  <div>
    <h1>Calendrier des concerts</h1>
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-hour"></div>
        <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
      </div>
      <div class="calendar-body">
        <div v-for="hour in hours" :key="hour" class="calendar-row">
          <div class="calendar-hour">{{ hour }}</div>
          <div v-for="day in days" :key="day" class="calendar-cell">
            <div v-if="concertsByDayAndHour[day][hour]" class="concert-card">
              <img class="concert-img" :src="concertsByDayAndHour[day][hour].image" alt="Affiche du concert" />
              <p class="nomArtiste">{{ concertsByDayAndHour[day][hour].artiste }}</p>
              <router-link :to="`/concert/${concertsByDayAndHour[day][hour].id}`">
                <button>Détails/Réserver</button>
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

export default {
  name: 'CalendrierConcert.vue',
  data() {
    return {
      days: this.getLastWeekOfOctober(),
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'],
    };
  },
  computed: {
    ...mapState(['concerts']),
    concertsByDayAndHour() {
      const concertsByDayAndHour = {};
      this.days.forEach(day => {
        concertsByDayAndHour[day] = {};
        this.hours.forEach(hour => {
          concertsByDayAndHour[day][hour] = null;
        });
      });
      this.concerts.forEach(concert => {
        const concertDate = new Date(concert.date);
        const concertDay = concertDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        const concertHour = concert.heure.split('h')[0] + ':00';
        if (this.days.includes(concertDay)) {
          concertsByDayAndHour[concertDay][concertHour] = concert;
        }
      });

      return concertsByDayAndHour;
    }
  }
,
  methods: {
    ...mapActions(['getAllConcert']),
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
    this.getAllConcert();
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
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1px;
}

.calendar-header {
  display: contents;
}

.calendar-hour {
  grid-column: 1;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  text-align: center;
  font-weight: bold;
}

.calendar-body {
  display: contents;
}

.calendar-row {
  display: contents;
}

.calendar-cell {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  min-height: 100px;
  position: relative;
}

.concert-card {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ff4444;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.3), 0 0 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.concert-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(60%) brightness(80%);
  margin-bottom: 5px;
  border-radius: 4px;
  transition: filter 0.3s;
}

.nomArtiste {
  font-size: 1.2em;
  font-family: 'Creepster', cursive;
  margin: 7px 0;
  color: #f2f2f2;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
}

.concert-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.concert-img:hover {
  filter: grayscale(0%) brightness(100%);
}

button {
  padding: 9px;
  font-size: 1em;
  font-family: 'Creepster', cursive;
  color: #fff;
  background-color: #ff4444;
  border: 2px solid #ff4444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

button:hover {
  background-color: #ff0000;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}

button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, transparent 20%, #ff0000);
  border-radius: 50%;
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
  transform: translate(-50%, -50%);
  z-index: 0;
}

button:hover::before {
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
}

button span {
  position: relative;
  z-index: 1;
}

</style>