<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <div class="signalements-container">
      <h1>{{ $t('report_list') }}</h1>
      <div v-if="signalement.length === 0" class="no-signalements">
        {{ $t('no_reports') }}
      </div>
      <div v-for="(signalement, index) in signalement" :key="index" class="signalement-card">
        <h2>{{ $t('report') }} {{ index + 1 }}</h2>
        <p><strong>{{ $t('type') }} :</strong> {{ signalement.typeIncident }}</p>
        <p><strong>{{ $t('description') }} :</strong> {{ signalement.descriptionIncident }}</p>
        <p><strong>{{ $t('area') }} :</strong> {{ signalement.zoneIncident }}</p>
        <p><strong>{{ $t('position') }} :</strong>
          {{ $t('latitude') }}: {{ signalement.positionUtilisateur.latitude }},
          {{ $t('longitude') }}: {{ signalement.positionUtilisateur.longitude }}
        </p>
        <p><strong>{{ $t('time') }} :</strong> {{ new Date(signalement.timestamp).toLocaleTimeString() }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "SecuflippeMesSignalements",
  components: {NavBar},
  computed: {
    ...mapState('SecuFlippeStore',['signalement'])
  },
  methods: {
    ...mapActions('SecuFlippeStore',['getAllSignalements'])
  },
  mounted() {
    this.getAllSignalements()
  }
}
</script>

<style scoped>
/* Styles globaux */
body {
  background: radial-gradient(circle, #1a1a1a, #000000);
  color: #eaeaea;
  font-family: 'Kanit', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Barre de navigation */
.navbar {
  margin-bottom: 30px;
}

/* Conteneur principal */
.signalements-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(145deg, #3a0000, #570000);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  text-align: center;
}

.signalements-container h1 {
  font-size: 50px;
  color: #f6c700;
  margin-bottom: 30px;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000;
}

/* Message pour aucun signalement */
.no-signalements {
  font-size: 24px;
  color: #ffffff;
  background: rgba(255, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  text-shadow: 0 0 5px #ff0000;
}

/* Carte de signalement */
.signalement-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #900c0c;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.signalement-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(255, 0, 0, 0.6), 0 0 20px #f6c700;
}

/* Titre des signalements */
.signalement-card h2 {
  font-size: 28px;
  color: #f6c700;
  margin-bottom: 15px;
  text-shadow: 0 0 5px #f6c700, 0 0 10px #ff0000;
}

/* Détails des signalements */
.signalement-card p {
  margin: 5px 0;
  font-size: 18px;
  color: #ffffff;
  line-height: 1.6;
}

.signalement-card strong {
  color: #f6c700;
}

/* Responsive */
@media (max-width: 768px) {
  .signalements-container {
    padding: 20px;
  }

  .signalements-container h1 {
    font-size: 40px;
  }

  .signalement-card h2 {
    font-size: 24px;
  }

  .signalement-card p {
    font-size: 16px;
  }
}

</style>