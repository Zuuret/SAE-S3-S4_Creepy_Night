<template>
  <div>
    <h1>Compte à Rebours</h1>
    <p>{{ days }} jours, {{ hours }} heures, {{ minutes }} minutes, {{ seconds }} secondes</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(), // Année en cours
      targetDate: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      intervalId: null,
    };
  },
  methods: {
    // Calcul du temps restant
    updateCompteRebours() {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      if (distance < 0) {
        // Si on est après le 25 octobre mais avant le 31 octobre de l'année
        const nowDate = new Date();
        const endOfOctober = new Date(nowDate.getFullYear(), 9, 31).getTime(); // 31 octobre de l'année

        if (nowDate >= new Date(this.currentYear, 9, 25) && nowDate <= new Date(this.currentYear, 9, 31)) {
          // Entre le 25 octobre et le 31 octobre : Afficher 0
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
        } else if (now > endOfOctober) {
          // Après le 31 octobre : Préparer pour l'année prochaine
          this.currentYear++;
          this.setTargetDate(); // Réinitialiser pour l'année prochaine
        }
      } else {
        // Calcul du temps restant
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    },

    // Définir la date cible
    setTargetDate() {
      this.targetDate = new Date(this.currentYear, 9, 25).getTime(); // 25 octobre de l'année courante
      this.updateCompteRebours(); // Mettre à jour immédiatement
    }
  },
  mounted() {
    this.setTargetDate(); // Initialiser la date cible
    this.intervalId = setInterval(this.updateCompteRebours, 1000); // Mettre à jour toutes les secondes
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Nettoyage quand le composant est détruit
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
