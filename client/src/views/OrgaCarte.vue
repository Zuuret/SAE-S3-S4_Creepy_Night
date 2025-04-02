<template>
  <div class="admin-carte">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="content-container">
      <div class="map-container">
        <h1>{{ $t('interactiveMap') }}</h1>
        <div class="map-wrapper">
          <img src="@/assets/carte_creepy_night.png" :alt="$t('eventMap')" class="base-map">
          
          <div v-for="spot in emplacement" :key="spot.id" class="map-icon" :class="{ 'selected': selectedSpot?.id === spot.id }" :style="{left: `${spot.coord_x}%`,top: `${spot.coord_y}%`, transform: 'translate(-50%, -50%)'}" @click="selectSpot(spot)">
          <img v-if="getIconById(spot.icone_id)" :src="getImagePath(getIconById(spot.icone_id).nom_image)" :alt="spot.nom" class="icon-image">
            <span class="tooltip">{{ spot.nom }}</span>
          </div>
        </div>
      </div>

      <div class="edit-panel" v-if="selectedSpot">
        <h2>{{ $t('editLocation') }}</h2>
        
        <div class="form-group">
          <label>{{ $t('name') }} :</label>
          <input v-model="selectedSpot.nom" type="text">
        </div>

        <div class="form-group">
          <label>{{ $t('coordinateX') }} :</label>
          <input v-model.number="selectedSpot.coord_x" type="number" min="0" max="100">
        </div>

        <div class="form-group">
          <label>{{ $t('coordinateY') }} :</label>
          <input v-model.number="selectedSpot.coord_y" type="number" min="0" max="100">
        </div>

        <div class="form-group">
          <label>{{ $t('provider') }} :</label>
          <select v-model="selectedSpot.prestataire_id" class="form-select">
            <option :value="null">{{ $t('noProvider') }}</option>
            <option 
              v-for="prestataire in prestataires" 
              :key="prestataire.id"
              :value="prestataire.id"
            >
              {{ prestataire.societe }} ({{ prestataire.theme }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('currentIcon') }} :</label>
          <img 
            :src="getImagePath(getIconById(selectedSpot.icone_id)?.nom_image)" 
            class="current-icon"
            @click="showIconSelector = true"
          >
        </div>

        <div class="icon-selector" v-if="showIconSelector">
          <h3>{{ $t('selectIcon') }}</h3>
          <div class="icons-grid">
            <div 
              v-for="icon in icones" 
              :key="icon.id"
              :class="{ 'selected': selectedSpot.icone_id === icon.id }"
              @click="selectIcon(icon.id)"
            >
              <img :src="getImagePath(icon.nom_image)" :alt="icon.nom_image">
            </div>
          </div>
          <button @click="showIconSelector = false">{{ $t('close') }}</button>
        </div>

        <button 
          class="save-btn" 
          @click="saveChanges"
          :disabled="!hasChanges"
        >
          {{ $t('saveChanges') }}
        </button>
      </div>

      <div class="edit-panel" v-else>
        <h2>{{ $t('selectLocation') }}</h2>
        <p>{{ $t('clickToEdit') }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  name: "OrgaCarte",
  components: { NavOrganisateur },
  data() {
    return {
      selectedSpot: null,
      originalSpot: null,
      showIconSelector: false
    }
  },
  computed: {
    ...mapGetters('carte', ['icones', 'emplacement']),
    ...mapState('profil', ['prestataires']), // Utilisation du même module que OrgaPrestataires
    hasChanges() {
      if (!this.selectedSpot || !this.originalSpot) return false;
      return JSON.stringify(this.selectedSpot) !== JSON.stringify(this.originalSpot);
    }
  },
  methods: {
    ...mapActions('profil', ['fetchPrestataires']), // Même action que OrgaPrestataires
    getImagePath(nom_image) {
      return require(`@/assets/${nom_image}`);
    },
    getIconById(iconId) {
      return this.icones.find(icon => icon.id === iconId);
    },
    selectSpot(spot) {
      this.selectedSpot = { ...spot };
      this.originalSpot = { ...spot };
      this.showIconSelector = false;
    },
    selectIcon(iconId) {
      this.selectedSpot.icone_id = iconId;
      this.showIconSelector = false;
    },
    async saveChanges() {
      if (!this.hasChanges || !this.selectedSpot?.id) {
        this.$toast.warning('Aucune modification à enregistrer');
        return;
      }
      
      try {
        const { id, nom, coord_x, coord_y, prestataire_id, icone_id } = this.selectedSpot;
        
        // On suppose que l'action réussit si elle ne lance pas d'exception
        await this.$store.dispatch('carte/saveEmplacement', {
          id,
          nom,
          coord_x,
          coord_y,
          prestataire_id,
          icone_id
        });
        
        // Si on arrive ici, c'est que ça a fonctionné
        this.$toast.success('Modifications enregistrées avec succès');
        this.originalSpot = { ...this.selectedSpot };
        await this.$store.dispatch('carte/fetchEmplacement');
        
      } catch (error) {
        console.error('Erreur:', error);
        const errorMsg = error.response?.data?.message 
                      || error.message 
                      || 'Erreur serveur lors de la sauvegarde';
        this.$toast.error(`Erreur: ${errorMsg}`);
      }
    }
  },
  async mounted() {
    try {
      // Charge les données initiales avec gestion d'erreur individuelle
      await this.$store.dispatch('carte/fetchIcone').catch(e => console.error("Erreur fetchIcone:", e));
      await this.$store.dispatch('carte/fetchEmplacement').catch(e => console.error("Erreur fetchEmplacement:", e));
      await this.fetchPrestataires().catch(e => console.error("Erreur fetchPrestataires:", e));
    } catch (error) {
      console.error("Erreur lors du chargement initial:", error);
    }
  }
};
</script>

<style scoped>
.admin-carte {
  display: flex;
  min-height: 100vh;
}

.navbar {
  width: 250px;
  background: #2c3e50;
  min-height: 100vh;
}

.content-container {
  flex: 1;
  display: flex;
  padding: 20px;
  background: #f5f5f5;
  gap: 20px;
}

.map-container {
  flex: 2;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.map-wrapper {
  position: relative;
  margin-top: 20px;
}

.base-map {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

.map-icon {
  position: absolute;
  cursor: pointer;
  transition: transform 0.2s;
}

.map-icon:hover, .map-icon.selected {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 10;
}

.map-icon.selected {
  filter: drop-shadow(0 0 5px rgba(0, 119, 255, 0.7));
}

.map-icon img {
  width: auto; 
  height: 60px;
  max-width: 60px;
  object-fit: contain;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
}

.map-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.edit-panel {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 350px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.current-icon {
  width: auto; 
  height: 75px;  
  max-width: 75px;  
  object-fit: contain;
  cursor: pointer;
  border: 2px solid #eee;
  border-radius: 4px;
  display: block;
  margin-top: 5px;
  transition: transform 0.2s;
}

.current-icon:hover {
  border-color: #0077ff;
}

.icon-selector {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 15px 0;
}

.icons-grid div {
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.icons-grid div.selected {
  background-color: #0077ff;
}

.icons-grid img {
  width: 100%;
  height: auto;
  max-width: 50px;
}

.save-btn {
  background-color: #0077ff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  width: 100%;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.save-btn:hover:not(:disabled) {
  background-color: #0055cc;
}

h1, h2, h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>