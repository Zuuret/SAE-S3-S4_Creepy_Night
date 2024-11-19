<template>
  <div class="interactive-container">
    <div class="navbars">
      <NavBar />
    </div>
    <!-- Zone zoomable -->
    <div
        class="zoom-container"
        :style="{ transform: `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)` }"
        @wheel="onWheel"
        @mousedown="startDragging"
        @mousemove="onDrag"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"
        @touchstart="startTouch"
        @touchmove="onTouch"
        @touchend="stopDragging"
    >
      <img src="@/assets/carte_grande.png" alt="Carte interactive" />

      <!-- Icônes interactives -->
      <div
          v-for="(icon, index) in icons"
          :key="index"
          class="icon"
          :style="{ top: `${icon.y}%`, left: `${icon.x}%` }"
          @click="showInfo(icon)"
      >
        📍
      </div>
    </div>

    <!-- Popup d'informations -->
    <div v-if="selectedIcon" class="popup">
      <h3>{{ selectedIcon.title }}</h3>
      <p>{{ selectedIcon.description }}</p>
      <button @click="selectedIcon = null">Fermer</button>
    </div>
  </div>
</template>
<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: "CarteInteractive",
  components: {
    NavBar,
  },
    data() {
      return {
        zoomLevel: 1, // Niveau de zoom initial
        maxZoom: 3, // Zoom maximum
        minZoom: 1, // Zoom minimum
        icons: [
          {x: 10, y: 58, title: "Cinépeur", description: "Le cinéma de la frousse."},
          {x: 13, y: 60, title: "Bal'Trouille ", description: "N'oubliez pas votre costume !!!."},
        ],
        selectedIcon: null,
        isDragging: false,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        lastOffsetX: 0,
        lastOffsetY: 0,
      };
    },
    methods: {
      // Zoom via la molette
      onWheel(event) {
        event.preventDefault();
        const zoomSpeed = 0.1;
        if (event.deltaY < 0) {
          this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + zoomSpeed);
        } else {
          this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - zoomSpeed);
        }
      },

      // Démarrage du drag (souris)
      startDragging(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
      },

      // Drag en cours (souris)
      onDrag(event) {
        if (this.isDragging) {
          const dx = event.clientX - this.startX;
          const dy = event.clientY - this.startY;
          this.offsetX = this.lastOffsetX + dx;
          this.offsetY = this.lastOffsetY + dy;
        }
      },

      // Fin du drag (souris)
      stopDragging() {
        if (this.isDragging) {
          this.isDragging = false;
          this.lastOffsetX = this.offsetX;
          this.lastOffsetY = this.offsetY;
        }
      },

      // Démarrage du drag (tactile)
      startTouch(event) {
        const touch = event.touches[0];
        this.startDragging({clientX: touch.clientX, clientY: touch.clientY});
      },

      // Drag en cours (tactile)
      onTouch(event) {
        const touch = event.touches[0];
        this.onDrag({clientX: touch.clientX, clientY: touch.clientY});
      },

      // Afficher les informations sur un point d'intérêt
      showInfo(icon) {
        this.selectedIcon = icon;
      },
    },
  }


</script>
<style scoped>
.interactive-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000; /* Optionnel : pour un contraste avec la carte */
}

.zoom-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: center center; /* Point d'origine pour le zoom */
  transition: transform 0.1s ease-out;
  cursor: grab;
}

.zoom-container:active {
  cursor: grabbing;
}

.icon {
  position: absolute;
  cursor: pointer;
  transform: translate(-50%, -50%);
  font-size: 24px; /* Taille de l'icône 📍 */
}

.popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
