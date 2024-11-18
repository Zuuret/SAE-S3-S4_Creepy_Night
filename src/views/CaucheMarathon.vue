<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <h1 class="titre">Cauche'Marathon</h1>

    <div class="container">
      <div class="circuit-image">
        <img v-if="selectedCircuit === 'both'" src="@/assets/Circuits.png" alt="Circuits">
        <img v-if="selectedCircuit === 'circuit1'" src="@/assets/Circuit1.png" alt="Circuit 1">
        <img v-if="selectedCircuit === 'circuit2'" src="@/assets/Circuit2.png" alt="Circuit 2">
      </div>

      <div class="content-right">
        <div class="presentation">
          <p class="lft">
            Le Cauche'Marathon est une course d'horreur unique en son genre, se déroulant dans le festival. Les participants devront courir à travers des circuits effrayants, en évitant les monstres et les pièges, pour atteindre la ligne d'arrivée. Les trois premiers de chaque course recevront des récompenses en argent, des médailles et un trophée exclusif !<br><br>
            Il y a deux circuits disponibles : La FrayeuRoute et L'ÉpouvanTour.<br><br>
            Les marathons sur la FrayeuRoute débuteront à 20h, tandis que ceux sur l'ÉpouvanTour débuteront à 22h.
          </p>
        </div>
        <div class="circuit-selection">
          <h2>Choisissez votre circuit</h2>
          <button @click="selectCircuit('both')" :disabled="selectedCircuit === 'both'">Carte intégrale</button>
          <button @click="selectCircuit('circuit1')" :disabled="selectedCircuit === 'circuit1'">La FrayeuRoute</button>
          <button @click="selectCircuit('circuit2')" :disabled="selectedCircuit === 'circuit2'">L'ÉpouvanTour</button>
        </div>

        <div class="day-selection">
          <h2>Choisissez votre jour</h2>
          <select v-model="selectedDay" :disabled="selectedCircuit === 'both'">
            <option value="mercredi">Mercredi 29 octobre</option>
            <option value="vendredi">Vendredi 31 octobre</option>
            <option value="dimanche">Dimanche 2 novembre</option>
          </select>
        </div>
        <p>Vivez une expérience effrayante en participant à cette course d'horreur ! Le prix du billet est de 10€.</p>
        <div class="ticket-purchase" v-if="selectedCircuit !== 'both'">
          <h2>Participer au Cauche'Marathon</h2>
          <p>Vous avez choisi : <strong>{{ selectedCircuitName }}</strong> le <strong>{{ selectedDayName }}</strong>.</p>
          <button @click="buyTicket">Billet - 10€</button>
        </div>

        <div class="prizes">
          <h2>Récompenses pour les Survivants</h2>
          <p>Tous les participants qui terminent la course recevront le certificat de "Survivant du Cauche'Marathon" !</p>
          <p>Les meilleurs coureurs de chaque circuit recevront des récompenses en argent, des médailles et possiblement un trophée exclusif :</p>
          <ul>
            <li><strong>1er place :</strong> 250€ + Médaille d'Or + Trophée exclusif</li>
            <li><strong>2e place :</strong> 150€ + Médaille d'Argent</li>
            <li><strong>3e place :</strong> 75€ + Médaille de Bronze</li>
          </ul>
          <p>Trophée exclusif du Cauche'Marathon décerné aux vainqueurs :</p>
          <img src="@/assets/trophee_marathon.jpeg" alt="Trophée du Cauche'Marathon" class="trophy-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'CaucheMarathon',
  components: { NavBar },
  data() {
    return {
      selectedCircuit: 'both',
      selectedDay: 'mercredi',
      ticketPrice: 10,
    };
  },
  computed: {
    selectedCircuitName() {
      switch (this.selectedCircuit) {
        case 'circuit1':
          return 'La FrayeuRoute';
        case 'circuit2':
          return 'L\'ÉpouvanTour';
        case 'both':
          return 'Carte intégrale';
        default:
          return 'Non sélectionné';
      }
    },
    selectedDayName() {
      switch (this.selectedDay) {
        case 'mercredi':
          return 'Mercredi 29 octobre';
        case 'vendredi':
          return 'Vendredi 31 octobre';
        case 'dimanche':
          return 'Dimanche 2 novembre';
        default:
          return 'Non sélectionné';
      }
    },
  },
  methods: {
    selectCircuit(circuit) {
      this.selectedCircuit = circuit;
    },
    buyTicket() {
      alert(`Billet acheté ! Préparez-vous pour la terreur. Prix : ${this.ticketPrice}€. Circuit : ${this.selectedCircuitName}, Jour : ${this.selectedDayName}`);
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');

.lft {
  text-align: left;
}

.titre {
  text-align: center;
  font-size: 2.5em;
  font-family: 'Creepster', cursive;
  letter-spacing: 2px;
  color: #ff4444;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.3);
  margin-top: 130px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
}

.circuit-selection,
.ticket-purchase,
.prizes,
.day-selection {
  text-align: left;
}

.circuit-image {
  padding-left: 10%;
  width: 35%;
}

.content-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 10px;
}

button {
  font-size: 16px;
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff4444;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Creepster', cursive;
}

button:hover {
  background-color: #ff1a1a;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.prizes {
  margin-top: 30px;
}

.prizes ul {
  list-style-type: none;
  padding: 0;
}

.prizes li {
  font-size: 16px;
  margin: 10px 0;
}

.trophy-image {
  width: 200px;
  margin-top: 20px;
  margin-left: 35%;
}

img {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}
</style>
