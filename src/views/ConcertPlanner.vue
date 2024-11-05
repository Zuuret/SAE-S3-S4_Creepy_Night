<template>
  <div class="concert-planner">
    <h1>Concert Planner</h1>

    <!-- Liste des concerts à placer -->
    <div class="concert-list">
      <h2>Concerts</h2>
      <draggable v-model="concerts" group="concerts" :clone="cloneConcert">
        <div v-for="concert in concerts" :key="concert.id" class="concert-item">
          <p>{{ concert.name }} - {{ concert.duration }} mins</p>
        </div>
      </draggable>
    </div>

    <!-- Planning hebdomadaire -->
    <div class="planning">
      <h2>Planning de la semaine</h2>
      <div class="planning-grid">
        <!-- En-tête des jours -->
        <div class="header">
          <div class="time-cell"></div> <!-- Cellule vide pour l'heure -->
          <div v-for="day in days" :key="day" class="day-header">{{ day }}</div>
        </div>

        <!-- Grille horaire -->
        <div v-for="hour in hours" :key="hour" class="hour-row">
          <!-- Colonne des heures -->
          <div class="time-cell">{{ hour }}:00</div>

          <!-- Créneaux horaires pour chaque jour -->
          <div
              v-for="day in days"
              :key="day + hour"
              class="time-slot"
          >
            <!-- Utilisation d'un drop manuel avec @end -->
            <draggable
                :list="planning[day][hour]"
                group="concerts"
                @end="onDropConcert(day, hour)"
            >
              <div
                  v-for="concert in planning[day][hour]"
                  :key="concert.id"
                  class="planning-item"
                  :style="{ height: concert.duration + 'px' }"
              >
                <p>{{ concert.name }}</p>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      concerts: [
        { id: 1, name: 'Traitre Gims', duration: 60 },
        { id: 2, name: 'Les Aphtes Punk', duration: 90 },
        { id: 3, name: 'VladimirReveur', duration: 45 },
      ],
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      hours: Array.from({ length: 7 }, (_, i) => (i + 20) % 24), // De 20h à 2h
      planning: {}, // Planning initialisé plus bas
    };
  },
  created() {
    // Initialise le planning avec des tableaux pour chaque jour et chaque heure
    this.days.forEach(day => {
      this.planning[day] = {};
      this.hours.forEach(hour => {
        this.planning[day][hour] = [];
      });
    });
  },
  methods: {
    cloneConcert(concert) {
      return { ...concert, id: Date.now() };
    },
    onDropConcert(day, hour) {
      // Supprime les concerts du tableau initial si déplacés
      this.concerts = this.concerts.filter(concert => !this.planning[day][hour].includes(concert));
    },
  },
};
</script>

<style scoped>
.concert-planner {
  display: flex;
  gap: 20px;
}
.concert-list, .planning {
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 300px;
}
.concert-item {
  border: 1px solid #333;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  text-align: center;
}

.planning-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 1 colonne pour les heures + 7 pour les jours */
}

.header, .hour-row {
  display: contents;
}

.time-cell {
  background-color: #eee;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.day-header {
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ddd;
}

.time-slot {
  border: 1px solid #ddd;
  height: 60px; /* Taille par défaut du créneau */
  padding: 5px;
  position: relative;
}

.planning-item {
  background-color: #d1e7dd;
  text-align: center;
  border: 1px solid #333;
}
</style>
