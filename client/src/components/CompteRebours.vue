<template>
  <div class="compte-rebours">
    <h1>Temps restant avant le début</h1>
    <p class="time-display">
      <span class="time-unit">{{ formatTime(days) }}</span> :
      <span class="time-unit">{{ formatTime(hours) }}</span> :
      <span class="time-unit">{{ formatTime(minutes) }}</span> :
      <span class="time-unit">{{ formatTime(seconds) }}</span>
    </p>
    <p class="current-date">Début du festival : {{ festivalDate }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      targetDate: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalId: null,
      festivalDate: this.getFestivalDate()
    };
  },
  methods: {
    updateCompteRebours() {
      const actu = new Date().getTime();
      const tempRestant = this.targetDate - actu;

      if (tempRestant < 0) {
        const actuDate = new Date();
        const endOfOctober = new Date(actuDate.getFullYear(), 9, 31).getTime();
        if (actuDate >= new Date(this.currentYear, 9, 25) && actuDate <= new Date(this.currentYear, 9, 31)) {
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        } else if (actu > endOfOctober) {
          this.currentYear++;
          this.setTargetDate();
        }
      } else {
        this.days = Math.floor(tempRestant / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((tempRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((tempRestant % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((tempRestant % (1000 * 60)) / 1000);
      }
    },
    setTargetDate() {
      this.targetDate = new Date(this.currentYear, 9, 27).getTime();
      this.updateCompteRebours();
    },
    formatTime(unit) {
      return String(unit).padStart(2, '0');
    },
    getFestivalDate() {
      return `27 octobre 2025`;
    }
  },
  mounted() {
    this.setTargetDate();
    this.intervalId = setInterval(this.updateCompteRebours, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
.compte-rebours {
  text-align: center;
  font-family: 'Creepster', cursive;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin: auto;
}

h1 {
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 20px;
}

.time-display {
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.time-unit {
  background-color: #1a1a1a;
  padding: 10px 20px;
  border-radius: 8px;
  min-width: 70px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
}

.current-date {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
}
</style>
