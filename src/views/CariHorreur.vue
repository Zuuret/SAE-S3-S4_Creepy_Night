<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <h1>CariHorreur</h1>
    <div class="container">
      <div class="formulaire-signalement">
        <h1>Réserver un carré VIP</h1>

        <!-- Sélecteur de date -->
        <label for="date-selection">Sélectionnez une date</label>
        <input
            type="date"
            v-model="dateCarre"
            id="date-selection"
            :min="'2025-10-27'"
            :max="'2025-11-02'"
            required
        />

        <label for="carre-selection">Sélectionnez la formule</label>
        <select v-model="carreType" id="carre-selection" required>
          <option value="vip2">Carré VIP + 2 bouteilles</option>
          <option value="vip3">Carré VIP + 3 bouteilles</option>
          <option value="ultravip2">Carré ultra VIP + 2 bouteilles</option>
          <option value="ultravip3">Carré ultra VIP + 3 bouteilles</option>
        </select>

        <label for="nbpersonne-selection">Sélectionnez le nombre de personnes</label>
        <select v-model="nbPersonne" id="nbpersonne-selection" required>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <button @click="addReservation">Valider la réservation</button>
      </div>

      <!-- Liste des réservations -->
      <div class="reservation-list">
        <h2>Mes Réservations</h2>
        <ul>
          <li v-for="(reservation, index) in reservations" :key="index">
            <div>
              <span>{{ reservation.date }} - {{ reservation.type }} ({{ reservation.personnes }} personnes)</span>
              <button @click="confirmCancel(index)">Annuler</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";

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
      reservations: [], // Liste des réservations
    };
  },
  methods: {
    // Ajouter une réservation
    addReservation() {
      if (this.dateCarre && this.carreType && this.nbPersonne) {
        // Ajouter la réservation dans la liste
        this.reservations.push({
          date: this.dateCarre,
          type: this.carreType,
          personnes: this.nbPersonne,
        });
        alert("Votre réservation a été ajoutée !");
        this.resetForm();
      } else {
        alert("Veuillez remplir tous les champs");
      }
    },
    // Réinitialiser le formulaire après une réservation
    resetForm() {
      this.dateCarre = "";
      this.carreType = "";
      this.nbPersonne = "";
    },
    // Confirmer l'annulation
    confirmCancel(index) {
      if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
        this.cancelReservation(index);
      }
    },
    // Annuler une réservation
    cancelReservation(index) {
      this.reservations.splice(index, 1);
      alert("Votre réservation a été annulée.");
    },
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
  font-family: Arial;
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

