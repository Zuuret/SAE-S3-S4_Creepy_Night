<template>
  <div class="image-container" @mousemove="moveEyes" @mouseleave="resetEyes">
    <img
        src="@/assets/EstebanGay.png"
        class="interactive-image"
        :class="{ angry: isAngry }"
        @click="toggleMood"
    >
    <div class="eye left-eye" :style="leftEyeStyle"></div>
    <div class="eye right-eye" :style="rightEyeStyle"></div>
  </div>
</template>

<script>
export default {
  name: "EstebanInteractive",
  data() {
    return {
      isAngry: false,
      leftEyeStyle: {},
      rightEyeStyle: {}
    };
  },
  methods: {
    toggleMood() {
      // Change l'humeur entre "calme" et "énervé" en alternant l'état isAngry
      this.isAngry = !this.isAngry;
    },
    moveEyes(event) {
      const { clientX, clientY } = event;
      const offsetX = (clientX - window.innerWidth / 2) / 60;
      const offsetY = (clientY - window.innerHeight / 2) / 60;
      this.leftEyeStyle = { transform: `translate(${offsetX}px, ${offsetY}px)` };
      this.rightEyeStyle = { transform: `translate(${offsetX}px, ${offsetY}px)` };
    },
    resetEyes() {
      // Réinitialise la position des yeux
      this.leftEyeStyle = {};
      this.rightEyeStyle = {};
    }
  }
};
</script>

<style scoped>
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  cursor: pointer;
  overflow: hidden;
}

.interactive-image {
  width: 400px;
  height: auto;
  object-fit: contain;
  transition: transform 0.5s, filter 0.5s ease-in-out;
  filter: brightness(0.95) contrast(1.1);
}

.interactive-image.angry {
  filter: brightness(0.8) contrast(1.3) hue-rotate(30deg);
}

.image-container:hover .interactive-image {
  transform: scale(1.1) rotate(1deg);
}

.eye {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease-out;
  z-index: 2;
}

.left-eye {
  top: 45%;
  left: 46%;
}

.right-eye {
  top: 45%;
  left: 54%;
}

.image-container:hover .left-eye,
.image-container:hover .right-eye {
  background-color: lightblue;
}
</style>
