<template>
  <div class="public-map-container" @click="activeSpot = null">
    <div class="map-and-legend-wrapper">
      <!-- Légende avec icônes agrandies -->
      <div class="legend">
        <h3>{{ $t('legend.title') }}</h3>
        <ul>
          <li 
            v-for="icon in icones" 
            :key="icon.id"
            :class="{ 'selected': selectedLegendIcon === icon.id }"
            @click.stop="toggleLegendIcon(icon.id)"
          >
            <img :src="getImagePath(icon.nom_image)" class="legend-icon">
            <span>{{ icon.nom_image.replace('.png', '').replace('icone_', '') }}</span>
          </li>
        </ul>
        <button 
          v-if="selectedLegendIcon" 
          @click.stop="resetLegendFilter"
          class="reset-filter-btn"
        >
          {{ $t('legend.showAll') }}
        </button>
      </div>

      <!-- Carte avec icônes agrandies -->
      <div class="map-container">
        <div class="map-wrapper">
          <img 
            :src="require('@/assets/carte_creepy_night.png')" 
            :alt="$t('map.altText')" 
            class="base-map"
          >
          
          <!-- Icônes des emplacements -->
          <div 
            v-for="spot in filteredEmplacement" 
            :key="spot.id" 
            class="map-icon"
            :class="{ 'active': activeSpot?.id === spot.id }"
            :style="{
              left: `${spot.coord_x}%`,
              top: `${spot.coord_y}%`
            }"
            @click.stop="toggleSpot(spot)"
          >
            <img 
              :src="getImagePath(getIconById(spot.icone_id)?.nom_image)" 
              :alt="spot.nom"
              class="icon-image"
            >
            
            <!-- Bulle d'information -->
            <transition name="popup">
              <div 
                v-if="activeSpot?.id === spot.id"
                class="spot-popup"
                @click.stop
              >
                <span class="spot-name">{{ spot.nom }}</span>
                <router-link 
                  v-if="spot.prestataire_id"
                  :to="'/prestataire/' + spot.prestataire_id" 
                  class="popup-btn"
                >
                  {{ $t('popup.viewPage') }}
                </router-link>
              </div>
            </transition>
          </div>
        </div>
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
      activeSpot: null,
      selectedLegendIcon: null
    }
  },
  computed: {
    ...mapGetters('carte', ['icones', 'emplacement']),
    
    filteredEmplacement() {
      if (!this.selectedLegendIcon) return this.emplacement;
      return this.emplacement.filter(spot => spot.icone_id === this.selectedLegendIcon);
    }
  },
  methods: {
    toggleSpot(spot) {
      this.activeSpot = this.activeSpot?.id === spot.id ? null : spot;
    },
    toggleLegendIcon(iconId) {
      this.selectedLegendIcon = this.selectedLegendIcon === iconId ? null : iconId;
    },
    resetLegendFilter() {
      this.selectedLegendIcon = null;
    },
    getImagePath(nom_image) {
      return require(`@/assets/${nom_image}`);
    },
    getIconById(iconId) {
      return this.icones.find(icon => icon.id === iconId);
    }
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch('carte/fetchEmplacement'),
      this.$store.dispatch('carte/fetchIcone')
    ]);
  }
};
</script>

<style scoped>
.public-map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.map-and-legend-wrapper {
  display: flex;
  gap: 1.5rem;
}

.legend {
  background: white;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 220px; /* Légèrement augmenté pour les grandes icônes */
}

.legend h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legend li {
  display: flex;
  align-items: center;
  padding: 0.75rem; /* Augmenté pour les grandes icônes */
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem; /* Espacement augmenté */
}

.legend li:hover {
  background: #f8f9fa;
}

.legend li.selected {
  background: #4361ee;
  color: white;
}

.legend-icon {
  width: 40px; 
  height: 40px;
  margin-right: 0.8rem; 
  object-fit: contain;
  transition: filter 0.2s;
}

.legend li.selected .legend-icon {
  filter: brightness(0) invert(1);
}

.reset-filter-btn {
  width: 100%;
  padding: 0.75rem; /* Taille augmentée */
  margin-top: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.reset-filter-btn:hover {
  background: #e9ecef;
}

.map-container {
  flex: 1;
  background: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.map-wrapper {
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;
}

.base-map {
  width: 100%;
  display: block;
}

.map-icon {
  position: absolute;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  z-index: 10;
}

.map-icon.active {
  z-index: 20;
}

.map-icon.active .icon-image {
  transform: scale(1.3); 
  filter: drop-shadow(0 0 12px rgba(0, 150, 255, 0.6)); 
}

.icon-image {
  height: 60px; 
  transition: all 0.2s ease;
}

.spot-popup {
  position: absolute;
  bottom: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 0.5rem;
  padding: 1rem; 
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); 
  min-width: 180px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.spot-name {
  font-weight: 600;
  font-size: 1rem; 
  color: #333;
}

.popup-btn {
  display: inline-block;
  padding: 0.6rem 1rem; 
  background: #4361ee;
  color: white;
  border-radius: 0.3rem;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.popup-btn:hover {
  background: #3a56e8;
  transform: translateY(-2px);
}

/* Animations */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.25s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(15px); 
}

@media (max-width: 768px) {
  .map-and-legend-wrapper {
    flex-direction: column;
  }
  
  .legend {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .legend-icon {
    width: 25px;
    height: 25px;
  }

  .icon-image {
    height: 45px;
  }
}
</style>