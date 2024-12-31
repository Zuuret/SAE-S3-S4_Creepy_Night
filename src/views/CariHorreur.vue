<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <h1>CariHorreur</h1>
    <div class="container">
      <div class="formulaire-signalement">
        <h1>Réserver un carré VIP</h1>

        <label for="date-selection">Sélectionnez une date</label>
        <input type="date" v-model="dateCarre" id="date-selection" :min="'2025-10-27'" :max="'2025-11-02'" required/>

        <label for="carre-selection">Sélectionnez la formule</label>
        <select v-model="carreType" id="carre-selection" required>
          <option value="Carré VIP">Carré VIP</option>
          <option value="Carré Ultra VIP">Carré Ultra VIP</option>
        </select>

        <label for="nbpersonne-selection">Sélectionnez le nombre de personnes</label>
        <select v-model="nbPersonne" id="nbpersonne-selection" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>

        <label for="bouteille-type">Type de bouteille</label>
        <select v-model="bouteilleType" id="bouteille-type" required>
          <option value="Champagne">Champagne</option>
          <option value="Vodka">Vodka</option>
          <option value="Whisky">Whisky</option>
          <option value="Tequila">Tequila</option>
          <option value="Rhum">Rhum</option>
        </select>

        <label for="bouteille-quantite">Quantité de bouteilles</label>
        <select v-model="bouteilleQuantite" id="bouteille-quantite" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <button @click="addReservation">Valider la réservation</button>
      </div>

      <div class="reservation-list">
        <h2>Mes Réservations</h2>
        <ul>
          <!-- Parcours des réservations -->
          <li v-for="(reservation, index) in reservations" :key="reservation.id_reservation">
            <div>
              <!-- Affichage des détails de la réservation -->
              <span>
          {{ reservation.dateCarre }} - {{ reservation.carreType }}
          ({{ reservation.nbPersonne }} personnes)
        </span>
              <ul v-if="reservation.bouteilles && reservation.bouteilles.length">
                <li v-for="bouteille in reservation.bouteilles" :key="bouteille.id_bouteille">
                  {{ bouteille.type }} x {{ bouteille.quantite }}
                </li>
              </ul>
              <button @click="confirmCancel(index)">Annuler la réservation</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "CariHorreur",
  components: {
    NavBar,
  },
  data() {
    return {
      dateCarre: "",
      carreType: "",
      nbPersonne: "",
      bouteilleType: "",
      bouteilleQuantite: "",
    };
  },
  computed: {
    ...mapState("CarihorreurStore", ["reservations"]),
  },
  methods: {
    ...mapActions("CarihorreurStore", ["getReservationCarihorreur", "addReservationToStore"]),
    addReservation() {
      if (this.dateCarre && this.carreType && this.nbPersonne && this.bouteilleQuantite && this.bouteilleType) {
        this.addReservationToStore({
          dateCarre: this.dateCarre,
          carreType: this.carreType,
          nbPersonne: this.nbPersonne,
          bouteilles: [
            {
              type: this.bouteilleType,
              quantite: this.bouteilleQuantite,
            },
          ],
        });
        alert("Votre réservation a été ajoutée !");
        this.resetForm();
      } else {
        alert("Veuillez remplir tous les champs");
      }
    },
    resetForm() {
      this.dateCarre = "";
      this.carreType = "";
      this.nbPersonne = "";
      this.bouteilleQuantite = "";
    },
    confirmCancel(index) {
      if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
        this.cancelReservation(index);
      }
    },
    cancelReservation(index) {
      this.reservations.splice(index, 1);
      alert("Votre réservation a été annulée.");
    },
  },
  mounted() {
    this.getReservationCarihorreur(1);
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: 'Creepster', cursive;
  font-size: 40px;
  color: black;
}

.formulaire-signalement {
  margin-top: 10%;
  margin-left: 5%;
  background-color: rgba(177, 52, 52, 0.8);
  border-radius: 8px;
  padding: 1px 30px 30px 30px;
  max-width: 600px;
  overflow: hidden;
  flex: 1;
}


label {
  display: block;
  margin-bottom: 8px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

select, input[type="text"] {
  width: 100%;
  padding: 0.8em;
  margin-bottom: 1.5em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

button {
  background-color: #d32f2f;
  color: #fff;
  padding: 1em 2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #b71c1c;
}

button:active {
  background-color: #7f1d1d;
}

textarea {
  width: 95%;
  height: 150px;
  padding: 0.8em;
  margin-bottom: 1.5em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, serif;
  outline: none;
  resize: none;
}

.container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1200px;
  margin: 2% 0 0 12%;
}

input[type="date"] {
  width: 100%;
  padding: 0.8em;
  margin-bottom: 1.5em;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.reservation-list {
  margin-top: 20px;
}

.reservation-list h2 {
  font-family: 'Creepster', cursive;
  color: black;
  text-align: center;
}

.reservation-list ul {
  list-style: none;
  padding: 0;
}

.reservation-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(177, 52, 52, 0.8);
  border-radius: 8px;
  color: white;
  font-size: 1.2em;
}

.reservation-list button {
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1em;
}

.reservation-list button:hover {
  background-color: #b71c1c;
}
</style>

