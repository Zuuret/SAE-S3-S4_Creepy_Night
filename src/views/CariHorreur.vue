<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="container">
      <div class="formulaire-signalement">
        <h1>Effectuer un signalement</h1>
        <!-- Formulaire de signalement -->
        <label for="incidents-selection">Sélectionnez le type d'incident :</label>
        <select v-model="incidentType" id="incidents-selection" required>
          <option value="perdu">Objet perdu</option>
          <option value="suspect">Comportement suspect</option>
          <option value="medical">Urgence médicale</option>
          <option value="inapproprié">Comportement inapproprié</option>
          <option value="technique">Problème technique</option>
          <option value="environnemental">Danger environnemental</option>
        </select>

        <label for="description-incident">Description de l'incident</label>
        <textarea v-model="incidentDescription" id="description-incident" name="description-incident" required></textarea>

        <label for="zone-selection">Sélectionnez la zone de l'incident :</label>
        <select v-model="incidentZone" id="zone-selection" required>
          <option value="foreffroi">La Foreffroi</option>
          <option value="cauchemanoir">Le Cauchemanoir</option>
          <option value="bosquepouvante">Le Bosquépouvante</option>
          <option value="maudile">La Maudîle</option>
          <option value="malaispace">La Malaispace</option>
        </select>

        <button @click="submitReport">Valider votre signalement</button>
      </div>

      <div class="carte-container" @click="addMarker">
        <img src="@/assets/carte_creepy_night.png" alt="Carte du festival" class="carte-festival" />
        <div v-if="markerPosition" class="marker" :style="{ top: markerPosition.top + 'px', left: markerPosition.left + 'px' }"></div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "SecuFlippe",
  components: {
    NavBar,
  },
  data() {
    return {
      incidentType: "",
      incidentDescription: "",
      incidentZone: "",
      markerPosition: null,
    };
  },
  methods: {
    submitReport() {
      if (this.incidentType && this.incidentDescription && this.markerPosition) {
        console.log("Type d'incident :", this.incidentType);
        console.log("Description :", this.incidentDescription);
        console.log("Position du marqueur :", this.markerPosition);
        alert("Votre signalement a été soumis !");
      } else {
        alert("Veuillez remplir tous les champs et définir la position.");
      }
    },
    addMarker(event) {
      const mapRect = event.target.getBoundingClientRect();
      const x = event.clientX - mapRect.left;
      const y = event.clientY - mapRect.top;

      if (x >= 0 && x <= mapRect.width && y >= 0 && y <= mapRect.height) {
        this.markerPosition = { top: y, left: x };
      }
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

.carte-container {
  position: relative;
  margin: 10% 0;
  max-width: 325px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
}

.carte-festival {
  width: 100%;
  border: 2px solid #000;
  cursor: pointer;
  border-radius: 8px;
}

.marker {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.marker:hover {
  background-color: #ff5722;
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
</style>

