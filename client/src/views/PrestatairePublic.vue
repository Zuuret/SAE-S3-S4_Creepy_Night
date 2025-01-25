<template>
  <div class="carousel-container">
    <button class="arrow left" @click="prevSlide">
      <i class="icon">&#8592;</i>
    </button>

    <div class="carousel-wrapper">
      <div class="carousel" :style="carouselStyle">
        <div v-for="prestataire in prestataires" :key="prestataire.id" class="carousel-item">
          <router-link :to="`/prestataire/${prestataire.id}`">
            <div class="prestataire-item">
              <img :src="prestataire.logo" :alt="prestataire.societe" class="prestataire-logo" />
              <div class="prestataire-details">
                <h3>{{ prestataire.societe }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <button class="arrow right" @click="nextSlide">
      <i class="icon">&#8594;</i>
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PrestataireCarousel",
  computed: {
    ...mapState("ProfilStore", ["prestataires"]),
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentSlide * 100}%)`,
      };
    },
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    ...mapActions("ProfilStore", ["getAllPrestataire"]),
    nextSlide() {
      if (this.currentSlide < this.prestataires.length - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
  },
  mounted() {
    this.getAllPrestataire();
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-wrapper {
  overflow: hidden;
  flex: 1;
}

.carousel {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  flex: 0 0 100%;
  box-sizing: border-box;
  padding: 10px;
}

.prestataire-item {
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 15px;
}

.prestataire-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.prestataire-details {
  margin-top: 15px;
}

.prestataire-details h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.arrow {
  background: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

.arrow .icon {
  font-size: 20px;
  font-weight: bold;
}
</style>
