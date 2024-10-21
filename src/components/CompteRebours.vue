<template>
  <div>
    <h1>Temps restant avant le début</h1>
    <p>{{ days }} jours, {{ hours }} heures, {{ minutes }} minutes, {{ seconds }} secondes</p>
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
      this.targetDate = new Date(this.currentYear, 9, 25).getTime();
      this.updateCompteRebours();
    }
  },
  mounted() {
    this.setTargetDate();
    this.intervalId = setInterval(this.updateCompteRebours, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
  font-size: 24px;
}
p {
  font-size: 20px;
}
</style>
