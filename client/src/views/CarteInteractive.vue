<template>
  <div class="interactive-map-container" @click="deselectIcon">
    <div class="legend">
      <h3>Légende</h3>
      <ul>
        <li v-for="(icon, index) in icons" :key="'legend-' + index" @click.stop="selectIcon(icon)" :class="{ active: selectedIcon === icon }"> {{ icon.title }} </li>
      </ul>
    </div>

    <div class="interactive-container">
      <div class="zoom-container" :style="{ transform: `scale(${zoomLevel})`, transformOrigin: `${transformOriginX} ${transformOriginY}` }" @wheel="onWheel">
        <img src="@/assets/carte_creepy_night.png" alt="Carte interactive" class="map-image" />
        <div v-for="(icon, index) in icons" :key="'icon-' + index" class="icon-container" :style="{ top: `${icon.y}%`, left: `${icon.x}%` }" @mouseover="hoverElement(icon)" @mouseleave="leaveElement" :class="{ 'icon-hovered': hoveredIcon === icon || selectedIcon === icon }">
          <img :src="icon.image" class="icon" :alt="icon.title" />
          <div v-if="hoveredIcon === icon || selectedIcon === icon" class="icon-info" @mouseenter.stop @mouseleave.stop>
            <h4>{{ icon.title }}</h4>
            <p>{{ icon.description }}</p>
            <img v-if="icon.image2" :src="icon.image2" class="illustration_activites" :alt="icon.title" />
            <router-link v-if="icon.route" :to="icon.route" class="detail-button">Détail</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      zoomLevel: 1,
      maxZoom: 3,
      minZoom: 1,
      transformOriginX: "50%", 
      transformOriginY: "50%",
      icons: [
      { x: 17, y: 50, title: "Grande scène", description: "Plongez dans une expérience musicale inoubliable lors des concerts prévus de notre festival !", image: require("@/assets/icone_concert.png"), image2: require("@/assets/concert_carte.jpg") },
      { x: 30, y: 40, title: "Poste de Secours", description: "Un espace dédié à votre sécurité pour répondre à toute urgence médicale pendant le festival.", image: require("@/assets/icone_secours.png"), },
      { x: 46.5, y: 44, title: "Exposition", description: "Explorez une exposition captivante qui met en avant des artistes locaux et des œuvres uniques.", image: require("@/assets/icone_expo.png"), image2: require("@/assets/expo-carte.jpg") },
      { x: 73, y: 38, title: "CinéPeur", description: "Venez frissonner devant des films effrayants dans notre cinéma en plein air, une expérience unique sous les étoiles !", image: require("@/assets/icone_cinema.png") },
      { x: 70, y: 30, title: "Bal'Trouille", description: "Dansez toute la nuit déguisé(e) dans une ambiance festive et terrifiante pour célébrer Halloween comme jamais auparavant !", image: require("@/assets/icone_baltrouille.png") },
      { x: 80, y: 22, title: "Poste de Secours", description: "Un espace dédié à votre sécurité pour répondre à toute urgence médicale pendant le festival.", image: require("@/assets/icone_secours.png") },
      { x: 64, y: 20, title: "Accueil", description: "Retrouvez toutes les informations nécessaires à votre visite et notre équipe prête à vous guider.", image: require("@/assets/icone_accueil.png") },
      { x: 56, y: 14, title: "Recharge Cashless", description: "Rechargez facilement et rapidement votre bracelet cashless pour profiter pleinement du festival.", image: require("@/assets/icone_cashless.png")},
      { x: 74, y: 15, title: "Restaurant Burger King", image: require("@/assets/icone_burgerking.png"), route: "/prestataire/1"},
      ],
      hoveredIcon: null,
      selectedIcon: null,
    };
  },
  methods: {
    onWheel(event) {
      event.preventDefault();

      const container = event.currentTarget;
      const rect = container.getBoundingClientRect();

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      this.transformOriginX = `${(mouseX / rect.width) * 100}%`;
      this.transformOriginY = `${(mouseY / rect.height) * 100}%`;

      const zoomSpeed = 0.1;
      if (event.deltaY < 0) {
        this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + zoomSpeed);
      } else {
        this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - zoomSpeed);
      }
    },
    hoverElement(icon) {
      this.hoveredIcon = icon;
    },
    leaveElement() {
      setTimeout(() => {
        this.hoveredIcon = null;
      }, 200);
    },
    selectIcon(icon) {
      if (this.selectedIcon === icon) {
        this.selectedIcon = null;
      } else {
        this.selectedIcon = icon;
      }
    },
    deselectIcon() {
      this.selectedIcon = null;
    },
  },
};
</script>

<style scoped>
.interactive-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.zoom-container {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
}


.map-image {
  position: relative;
  top: 100px;
  width: 100%;
  height: auto; 
  border-radius: 10px;
}

.icon-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon {
  width: 70px;
  height: 100px;
  transition: transform 0.3s ease;
}

.icon-hovered .icon {
  animation: bounce 0.6s infinite;
}

.icon-info {
  width: 500%;
  max-width: 300px;
  position: absolute;
  bottom: 100%;
  transform: translateY(-10px); 
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 12px 15px; 
  border-radius: 8px; 
  z-index: 2;
  pointer-events: auto;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.icon-info h4 {
  font-size: 18px;
  margin-bottom: 5px; 
  font-weight: bold;
}


.icon-info p {
  font-size: 14px;
  line-height: 1.4;
  margin: 0; 
}


.illustration_activites {
  width: 100%;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.interactive-map-container {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 90%;
  margin: 0 auto;
  height: 90vh; 
  background-color: #f5f5f5; 
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}


.legend {
  width: 40%;
  background-color: #e7e7e7;
  font-family: 'Creepster', cursive;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  border-radius: 10px; 
  height: 94%;
  display: flex;
  flex-direction: column;
}

.legend h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: black;
  font-size: 200%;
}

.legend ul {
  list-style: none;
  padding: 0;
}

.legend li {
  padding: 10px;
  margin: 5px 0;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: black;
}

.legend li:hover {
  background-color: #d6d6d6;
}

.legend li.active {
  background-color: #AD0918;
  font-weight: bold;
  color: white;
}

.interactive-container {
  flex-grow: 1; 
  max-width: 70%; 
  position: relative;
  overflow: hidden;
}

.detail-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #AD0918;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.detail-button:hover {
  background-color: #D40F1C; 
  transform: scale(1.05);
}

.detail-button:active {
  transform: scale(0.95);
}

</style>
