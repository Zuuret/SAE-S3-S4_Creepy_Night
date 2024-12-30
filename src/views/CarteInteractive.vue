<template>
  <div class="interactive-container">
    <div class="zoom-container" :style="{ transform: `scale(${zoomLevel})` }" @wheel="onWheel">
      <img src="@/assets/carte_creepy_night.png" alt="Carte interactive" class="map-image" />

      <div
          v-for="(icon, index) in icons"
          :key="'icon-' + index"
          class="icon-container"
          :style="{ top: `${icon.y}%`, left: `${icon.x}%` }"
          @mouseover="hoverElement(icon)"
          @mouseleave="leaveElement"
          :class="{ 'icon-hovered': hoveredIcon === icon }"
      >
        <img :src="icon.image" class="icon" :alt="icon.title" />

        <div
            v-if="hoveredIcon === icon"
            class="icon-info"
            @mouseover="hoverElement(icon)"
            @mouseleave="leaveElement"
        >
          <h4>{{ icon.title }}</h4>
          <p>{{ icon.description }}</p>
          <img :src="icon.image2" class="illustration_activites" :alt="illustration_activite"/>
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
      icons: [
        { x: 12, y: 57, title: "Grande scène", description: "Plongez dans une expérience musicale inoubliable lors des concerts prévus de notre festival !", image: require("@/assets/icone_concert.png"), image2: require("@/assets/concert_carte.jpg") },
        { x: 31.5, y: 38, title: "Point d'intérêt 2", description: "Description du point 2", image: require("@/assets/icone_secours.png")},
        { x: 46.5, y: 44, title: "Point d'intérêt 3", description: "Description du point 3", image: require("@/assets/icone_expo.png")},
        { x: 70, y: 37, title: "Point d'intérêt 4", description: "Description du point 4", image: require("@/assets/icone_cinema.png")},
        { x: 68, y: 25, title: "Point d'intérêt 5", description: "Description du point 5", image: require("@/assets/icone_baltrouille.png") },
        { x: 78, y: 19, title: "Point d'intérêt 6", description: "Description du point 6", image: require("@/assets/icone_secours.png")},
        { x: 64, y: 20, title: "Point d'intérêt 7", description: "Description du point 7" },
        { x: 58, y: 12, title: "Point d'intérêt 8", description: "Description du point 8" },
        { x: 74, y: 15, title: "Point d'intérêt 9", description: "Description du point 9" },
      ],
      hoveredIcon: null, // Stocke l'icône survolée
    };
  },
  methods: {
    onWheel(event) {
      event.preventDefault();
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
      if (!this.$el.contains(event.relatedTarget)) {
        this.hoveredIcon = null; // Cacher l'info-bulle uniquement si la souris quitte toute la zone
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.interactive-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Zone zoomable */
.zoom-container {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

/* Image de la carte */
.map-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

/* Conteneur de chaque icône avec son info */
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

/* Icône */
.icon {
  width: 70px;
  height: 100px;
  transition: transform 0.3s ease;
}

/* Animation lors du survol */
.icon-hovered .icon {
  animation: bounce 0.6s infinite;
}

/* Info-bulle */
.icon-info {
  width: 500%; /* Supprimer la largeur de 500% */
  max-width: 300px; /* Limite la largeur de l'info-bulle */
  position: absolute;
  bottom: 100%; /* Place les infos juste au-dessus de l'icône */
  transform: translateY(-10px); /* Ajuste l'espacement vertical */
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7); /* Fond sombre avec transparence */
  color: white;
  padding: 12px 15px; /* Plus d'espace pour rendre le texte plus lisible */
  border-radius: 8px; /* Bord arrondi */
  z-index: 2;
  pointer-events: none; /* Empêche l'info-bulle de gêner le clic sur l'icône */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Transition fluide */
}

/* Titre de l'info-bulle */
.icon-info h4 {
  font-size: 18px;
  margin-bottom: 5px; /* Un peu d'espace entre le titre et la description */
  font-weight: bold; /* Titre en gras pour le rendre plus visible */
}

/* Description de l'info-bulle */
.icon-info p {
  font-size: 14px;
  line-height: 1.4; /* Améliore la lisibilité du texte */
  margin: 0; /* Supprime les marges supplémentaires */
}


.illustration_activites {
  width: 100%;
}

/* Animation bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

</style>
