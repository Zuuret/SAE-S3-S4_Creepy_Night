<template>
  <div class="public-map-container">
    <h1>Carte du Festival</h1>
    <div class="map-and-legend-wrapper">
      <!-- Légende -->
      <div class="legend">
        <h3>Légende</h3>
        <ul>
          <li 
            v-for="icon in icones" 
            :key="icon.id"
            @mouseenter="highlightIconType(icon.id)"
            @mouseleave="resetIconHighlight"
          >
            <img :src="getImagePath(icon.nom_image)" class="legend-icon">
            <span>{{ icon.nom_image.replace('.png', '').replace('icone_', '') }}</span>
          </li>
        </ul>
      </div>

      <!-- Carte dans div blanche -->
      <div class="white-map-container">
        <div class="map-wrapper">
          <img src="@/assets/carte_creepy_night.png" alt="Carte du festival" class="base-map">
          
          <!-- Icônes des emplacements -->
          <div 
            v-for="spot in emplacement" 
            :key="spot.id" 
            class="map-icon"
            :style="{
              left: `${spot.coord_x}%`,
              top: `${spot.coord_y}%`,
              transform: 'translate(-50%, -50%)'
            }"
            @mouseenter="hoveredSpot = spot"
            @mouseleave="hoveredSpot = null"
            @click="selectSpot(spot)"
          >
            <img 
              v-if="getIconById(spot.icone_id)" 
              :src="getImagePath(getIconById(spot.icone_id).nom_image)" 
              :alt="spot.nom"
              class="icon-image"
            >
            <span class="tooltip">{{ spot.nom }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fenêtre d'information -->
    <div class="info-panel" v-if="selectedSpot">
      <div class="info-header">
        <h2>{{ selectedSpot.nom }}</h2>
        <button @click="selectedSpot = null" class="close-btn">×</button>
      </div>
      
      <div v-if="getPrestataireById(selectedSpot.prestataire_id)" class="prestataire-info">
        <h3>{{ getPrestataireById(selectedSpot.prestataire_id).societe }}</h3>
        <p>{{ getPrestataireById(selectedSpot.prestataire_id).description }}</p>
        <router-link 
          :to="'/prestataire/' + selectedSpot.prestataire_id" 
          class="detail-link"
        >
          Voir la page du prestataire →
        </router-link>
      </div>
      <div v-else>
        <p>Emplacement du festival</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "PublicCarte",
  data() {
    return {
      selectedSpot: null,
      hoveredSpot: null,
      highlightedIconType: null
    }
  },
  computed: {
    ...mapGetters('carte', ['icones', 'emplacement']),
    ...mapGetters('prestataire', ['prestataires']),
    
    filteredEmplacement() {
      if (!this.highlightedIconType) return this.emplacement;
      return this.emplacement.filter(spot => spot.icone_id === this.highlightedIconType);
    }
  },
  methods: {
    getImagePath(nom_image) {
      return require(`@/assets/${nom_image}`);
    },
    getIconById(iconId) {
      return this.icones.find(icon => icon.id === iconId);
    },
    getPrestataireById(prestataireId) {
      return this.prestataires.find(p => p.id === prestataireId);
    },
    selectSpot(spot) {
      this.selectedSpot = spot;
    },
    highlightIconType(iconId) {
      this.highlightedIconType = iconId;
    },
    resetIconHighlight() {
      this.highlightedIconType = null;
    }
  },
  async mounted() {
    await this.$store.dispatch('carte/fetchEmplacement');
    await this.$store.dispatch('carte/fetchIcone');
    await this.$store.dispatch('prestataire/fetchPrestataires');
  }
};
</script>

<style scoped>
.public-map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.map-and-legend-wrapper {
  display: flex;
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.white-map-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-wrapper {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.base-map {
  width: 100%;
  display: block;
}

.legend {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.legend h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  text-align: center;
}

.legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.legend li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.legend li:last-child {
  border-bottom: none;
}

.legend li:hover {
  background-color: #f5f5f5;
}

.legend-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  object-fit: contain;
}

/* Reste du CSS inchangé */
.map-icon {
  position: absolute;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
  z-index: 10;
}

.map-icon:hover {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 20;
}

.icon-image {
  width: auto;
  height: 50px;
  max-width: 50px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
}

.map-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.info-panel {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #7f8c8d;
}

.prestataire-info {
  margin-top: 10px;
}

.detail-link {
  display: inline-block;
  margin-top: 10px;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.detail-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .map-and-legend-wrapper {
    flex-direction: column;
  }
  
  .legend {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .info-panel {
    width: 95%;
    bottom: 10px;
  }
}
</style>