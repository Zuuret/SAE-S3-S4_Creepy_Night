<template>
  <div class="page-with-background">
    <div class="navbar">
      <NavBar />
    </div>

    <h1 class="titre">TICKETS ET ABONNEMENTS</h1>

    <div class="carousel">
      <button @click="previousSlide" class="carousel-button left">❮</button>
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }">
        <div
            class="affiche"
            v-for="(ticket, index) in tickets"
            :key="index"
        >
          <h2 class="sous-titre">{{ ticket.title }}</h2>
          <h3>{{ ticket.price }} €</h3>
          <ul>
            <li v-for="(feature, i) in ticket.features" :key="i">{{ feature }}</li>
          </ul>
          <button class="buy-button">
            <router-link :to="{ name: 'PaymentForm', params: { ticketId: ticket.id, price: ticket.price } }">Acheter</router-link>
          </button>
        </div>
      </div>

      <button @click="nextSlide" class="carousel-button right">❯</button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "PageWithBackground",
  components: {NavBar},
  data() {
    return {
      tickets: [
        {
          id: 1,
          title: "ticket standard - pass 1 jour",
          price: 19.99,
          features: ["accès à toutes les activités", "accès au baltrouille"],
        },
        {
          id: 2,
          title: "ticket premium - pass 2 jours",
          price: 29.99,
          features: ["accès à toutes les activités", "accès VIP", "cadeau surprise"],
        },
        {
          id: 3,
          title: "ticket VIP - pass 3 jours",
          price: 49.99,
          features: ["accès à toutes les activités", "accès VIP exclusif", "cadeau premium"],
        },
      ],
      currentIndex: 0,
      visibleSlides: 1,
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.tickets.length;
    },
    previousSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.tickets.length) % this.tickets.length;
    },
  },
};
</script>

<style scoped>
.page-with-background {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}

.page-with-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/fond_Accueil.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(50%);
  z-index: -1;
}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Centre le carrousel */
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease; /* Animation smooth */
}

.affiche {
  min-width: 80%; /* Largeur de chaque affiche ajustée à 80% pour plus de centrer */
  flex-shrink: 0;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  margin: 0 10%;
}

.titre {
  color: white;
  margin-bottom: 20px;
}

.sous-titre {
  margin-top: 0;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  padding: 10px;
  border-radius: 50%;
}

.carousel-button.left {
  left: 20%;
}

.carousel-button.right {
  right: 20%;
}

.buy-button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
</style>