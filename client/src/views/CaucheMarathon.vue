<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <h1 class="titre">{{ $t('cauchemarathon.title') }}</h1>

    <div class="container">
      <div class="circuit-image">
        <img v-if="selectedCircuit === 'both'" src="@/assets/Circuits.png" :alt="$t('cauchemarathon.circuits')" />
        <img v-if="selectedCircuit === 'circuit1'" src="@/assets/Circuit1.png" :alt="$t('cauchemarathon.circuit1')" />
        <img v-if="selectedCircuit === 'circuit2'" src="@/assets/Circuit2.png" :alt="$t('cauchemarathon.circuit2')" />
      </div>

      <div class="content-right">
        <div class="presentation">
          <p class="lft">
            {{ $t('cauchemarathon.description') }}
          </p>
        </div>
        <div class="circuit-selection">
          <h2>{{ $t('cauchemarathon.choose_circuit') }}</h2>
          <button @click="selectCircuit('both')" :disabled="selectedCircuit === 'both'">{{ $t('cauchemarathon.full_map') }}</button>
          <button @click="selectCircuit('circuit1')" :disabled="selectedCircuit === 'circuit1'">{{ $t('cauchemarathon.circuit1') }}</button>
          <button @click="selectCircuit('circuit2')" :disabled="selectedCircuit === 'circuit2'">{{ $t('cauchemarathon.circuit2') }}</button>
        </div>
        <div class="textes">
          <div class="day-selection">
            <h2>{{ $t('cauchemarathon.choose_day') }}</h2>
            <select v-model="selectedDay" :disabled="selectedCircuit === 'both'">
              <option value="mercredi">{{ $t('cauchemarathon.wednesday') }}</option>
              <option value="vendredi">{{ $t('cauchemarathon.friday') }}</option>
              <option value="dimanche">{{ $t('cauchemarathon.sunday') }}</option>
            </select>
          </div>
          <p>{{ $t('cauchemarathon.experience') }}</p>
          <label class="qtt" for="quantity">{{ $t('cauchemarathon.tickets') }}</label>
          <input type="number" id="quantity" name="quantity" min="1" max="30" v-model="nb_place" />
          <div class="ticket-purchase" v-if="selectedCircuit !== 'both' && utilisateurConnecte && nb_place > 0">
            <h2>{{ $t('cauchemarathon.participate') }}</h2>
            <p>{{ $t('cauchemarathon.chosen', { places: nb_place, circuit: selectedCircuitName, day: selectedDayName }) }}</p>
            <button @click="buyTicket">{{ $t('cauchemarathon.ticket_price', { price: totalPrice }) }}</button>
          </div>
          <div v-else-if="selectedCircuit === 'both'">
            <p style="color: #ff4444; font-weight: bold;">{{ $t('cauchemarathon.select_circuit') }}</p>
          </div>
          <div v-else-if="!utilisateurConnecte">
            <p style="color: #ff4444; font-weight: bold;">{{ $t('cauchemarathon.login_required') }}</p>
            <button @click="$router.push('/connexion')">{{ $t('cauchemarathon.login') }}</button>
          </div>
          <div v-else-if="nb_place <= 0">
            <p style="color: #ff4444; font-weight: bold;">{{ $t('cauchemarathon.valid_places') }}</p>
          </div>

          <div class="prizes">
            <h2>{{ $t('cauchemarathon.rewards_title') }}</h2>
            <p>{{ $t('cauchemarathon.certificate') }}</p>
            <p>{{ $t('cauchemarathon.rewards') }}</p>
            <ul>
              <li><strong>{{ $t('cauchemarathon.first_place') }}</strong></li>
              <li><strong>{{ $t('cauchemarathon.second_place') }}</strong></li>
              <li><strong>{{ $t('cauchemarathon.third_place') }}</strong></li>
            </ul>
            <br />
            <p>{{ $t('cauchemarathon.trophy') }}</p>
            <img src="@/assets/trophee_marathon.jpeg" :alt="$t('cauchemarathon.trophy_image')" class="trophy-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";
import { mapState, mapMutations } from 'vuex';
import CauchemarathonService from "@/services/cauchemarathon.service";

export default {
  name: 'CaucheMarathon',
  components: { NavBar },
  data() {
    return {
      nb_place: 0,
      selectedCircuit: 'both',
      selectedDay: 'mercredi',
      ticketPrice: 10,
    };
  },
  computed: {
    ...mapState('ProfilStore', ['utilisateurConnecte']),
    totalPrice() {
      return this.nb_place * this.ticketPrice;
    },
    selectedCircuitName() {
      switch (this.selectedCircuit) {
        case 'circuit1':
          return 'La FrayeuRoute';
        case 'circuit2':
          return 'Le CrainTour';
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
    selectedDayIso() {
      const key = `${this.selectedDay}-${this.selectedCircuit}`;
      switch (key) {
        case 'mercredi-circuit1':
          return "2025-10-29T20:00:00.000Z";
        case 'vendredi-circuit1':
          return "2025-10-31T20:00:00.000Z";
        case 'dimanche-circuit1':
          return "2025-11-02T20:00:00.000Z";
        case 'mercredi-circuit2':
          return "2025-10-29T22:00:00.000Z";
        case 'vendredi-circuit2':
          return "2025-10-31T22:00:00.000Z";
        case 'dimanche-circuit2':
          return "2025-11-02T22:00:00.000Z";
        default:
          return new Date().toISOString();
      }
    }
  },
  methods: {
    ...mapMutations('ProfilStore', ['updateSoldeUtilisateur']),
    selectCircuit(circuit) {
      this.selectedCircuit = circuit;
    },
    async buyTicket() {
      if (this.utilisateurConnecte.solde < this.totalPrice) {
        alert('Solde insuffisant pour acheter le(s) billet(s). Veuillez recharger votre compte sur la page CashLess.');
        return;
      }
      let response = await CauchemarathonService.buyTicketCauchemarathon({ idUser: this.utilisateurConnecte.id, nbBillets: this.nb_place, price: this.totalPrice, dateCourse: this.selectedDayIso, nomCourse: this.selectedCircuitName });
      if (response.data.status !== 200) {
        alert(response.error);
        return;
      }
      this.updateSoldeUtilisateur(response.data.solde);
      alert(`Billet(s) acheté(s) ! Préparez-vous pour la terreur.
             Prix : ${this.totalPrice}€.
             Circuit : ${this.selectedCircuitName}, Jour : ${this.selectedDayName}, Nombre de place : ${this.nb_place}.
             Id de la réservation : ${response.data.reservation.id_reservation}`);
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

body {
  background-color: #121212;
  color: #e0e0e0;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

.titre {
  text-align: center;
  font-size: 3em;
  font-family: 'Creepster', cursive;
  letter-spacing: 2px;
  color: #ff4444;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.6), 0 0 30px rgba(255, 0, 0, 0.4);
  margin-top: 9%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px 10%;
}

.circuit-image {
  width: 40%;
  position: relative;
}

.circuit-image img {
  border-radius: 15px;
  border: 2px solid #ff4444;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
}

.content-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 55%;
  background: rgba(34, 34, 34, 0.9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
}

.presentation p {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #cccccc;
}

.circuit-selection h2,
.day-selection h2,
.prizes h2,
.ticket-purchase h2 {
  font-family: 'Creepster', cursive;
  font-size: 2em;
  color: #ff4444;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.4);
  margin-bottom: 15px;
}

button {
  font-size: 1em;
  margin: 10px 5px;
  padding: 10px 15px;
  border: 2px solid #ff4444;
  border-radius: 5px;
  background-color: #212121;
  color: #ff4444;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #ff4444;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.6);
}

button:disabled {
  background-color: #444444;
  border: 2px solid #666666;
  color: #999999;
  cursor: not-allowed;
}

.prizes ul {
  list-style-type: none;
  padding: 0;
}

.textes p {
  color: #cccccc;
}

.prizes li {
  font-size: 1.1em;
  padding-left: 20px;
  margin: 10px 0;
  display: flex;
  color: #cccccc;
  align-items: center;
}

.prizes li:before {
  content: '🩸';
  margin-right: 10px;
  color: #ff4444;
}

.trophy-image {
  display: block;
  margin: 20px auto;
  width: 200px;
  border-radius: 10px;
  border: 2px solid #ff4444;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
}

select {
  background-color: #212121;
  color: #ff4444;
  border: 2px solid #ff4444;
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  margin: 10px 0;
}

select:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.8);
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #111111;
  color: #ff4444;
  font-family: 'Creepster', cursive;
  letter-spacing: 2px;
}

.qtt {
  font-size: 1.2em;
  margin: 10px 0;
  color: #cccccc;
}

</style>
