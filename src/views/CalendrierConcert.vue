<template>
  <div>
    <h1>Calendrier des concerts</h1>
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-hour"></div>
        <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
        <div class="calendar-header-scene">
          <div class="calendar-hour"></div>
          <div v-for="day in days" :key="day" class="calendar-scene-header">
            <span>Grande Scène</span> | <span>Scène de la peur</span>
          </div>
        </div>

      </div>
      <div class="calendar-body">
        <div v-for="hour in hours" :key="hour" class="calendar-row">
          <div class="calendar-hour">{{ hour }}</div>
          <div v-for="day in days" :key="day" class="calendar-cell">
            <div class="cell">
              <div class="scene">
                <div v-if="concertsByDayAndHour[day][hour]['Grande Scène']" class="concert-card">
                  <img class="concert-img" :src="concertsByDayAndHour[day][hour]['Grande Scène'].image" alt="Affiche du concert" />
                  <p class="nomArtiste">{{ concertsByDayAndHour[day][hour]['Grande Scène'].artiste }}</p>
                  <router-link :to="`/concert/${concertsByDayAndHour[day][hour]['Grande Scène'].id}`">
                    <button>Détails/Réserver</button>
                  </router-link>
                </div>
              </div>
              <!-- Section pour la Scène de la Peur -->
              <div class="scene" >
                <div v-if="concertsByDayAndHour[day][hour]['Scène de la peur']" class="concert-card">
                  <img class="concert-img" :src="concertsByDayAndHour[day][hour]['Scène de la peur'].image" alt="Affiche du concert" />
                  <p class="nomArtiste">{{ concertsByDayAndHour[day][hour]['Scène de la peur'].artiste }}</p>
                  <router-link :to="`/concert/${concertsByDayAndHour[day][hour]['Scène de la peur'].id}`">
                    <button>Détails/Réserver</button>
                  </router-link>
                </div>
              </div>
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
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00'],
    };
  },
  computed: {
    ...mapState(['concerts']),
    concertsByDayAndHour() {
      const concertsByDayAndHour = {};
      this.days.forEach(day => {
        concertsByDayAndHour[day] = {};
        this.hours.forEach(hour => {
          concertsByDayAndHour[day][hour] = { 'Grande Scène': null, 'Scène de la peur': null };
        });
      });
      this.concerts.forEach(concert => {
        console.log('Concert:', concert);
        const concertDate = new Date(concert.date);
        const concertDay = concertDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        const concertHour = concert.heure.split('h')[0] + ':00';
        console.log('Concert Day:', concertDay, 'Concert Hour:', concertHour);
        if (this.days.includes(concertDay)) {
          concertsByDayAndHour[concertDay][concertHour][concert.scene] = concert;
        }
      });

      Object.keys(concertsByDayAndHour).forEach(day => {
        Object.keys(concertsByDayAndHour[day]).forEach(hour => {
          const grandeScene = concertsByDayAndHour[day][hour]['Grande Scène'];
          const scenePeur = concertsByDayAndHour[day][hour]['Scène de la peur'];
          if (grandeScene && !scenePeur) grandeScene.single = true;
          if (scenePeur && !grandeScene) scenePeur.single = true;
        });
      });
      console.log('Concerts by day and hour:', concertsByDayAndHour);
      return concertsByDayAndHour;
    }
  },
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
  text-shadow: 0 0 4px rgba(255, 0, 0, 0.2), 0 0 10px rgba(255, 0, 0, 0.2);
  margin-bottom: 20px;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: auto;
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
  flex-direction: row;
  border: 1px solid #ddd;
  min-height: 100px;
  position: relative;
}

.concert-card {
  width: 48%;
  height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #444;
  box-sizing: border-box;
  overflow: hidden;
}

.concert-card.single {
  width: 100%;
}

.concert-card + .concert-card {
  margin-left: 4%; /* espace entre les deux cartes de concert */
}

.concert-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(60%) brightness(80%);
  margin-bottom: 5px;
  border-radius: 4px;
}

.calendar-cell > .concert-card:first-child {
  border-right: 1px solid #777;
}

.calendar-header-scene {
  display: contents;
}

.calendar-scene-header {
  font-size: 10px;
  grid-column: span 1;
  text-align: center;
  font-weight: bold;
  color: #333;
  padding-bottom: 5px;
  white-space: nowrap;
}

.cell {
  display: flex;
}

.cell .scene {
  width: 50%;
  padding: 5px; /* pour ajouter un peu d'espace autour de chaque carte */
}

.concert-card {
  width: 100%;
}

.nomArtiste {
  font-size: 15px;
  font-family: 'Creepster', cursive;
  margin: 10px 0;
  color: #f2f2f2;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
}
</style>