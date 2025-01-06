<template>
  <div class="demande-formulaire">
    <h2>Formulaire UberFlippe</h2>
      <div>
        <label for="zone-selection">Sélectionnez la zone de l'incident :</label>
        <select v-model="zone" id="zone-selection" required>
          <option value="Foreffroi">La Foreffroi</option>
          <option value="Cauchemanoir">Le Cauchemanoir</option>
          <option value="Bosquepouvante">Le Bosquépouvante</option>
          <option value="Maudile">La Maudîle</option>
          <option value="Malaispace">La Malaispace</option>
        </select>
      </div>

      <div>
        <label for="nbPersonne">Nombre de personnes :</label>
        <input v-model.number="nbPersonne" type="number" id="nbPersonne" min="1" required />
      </div>

      <div>
        <label for="description">Description :</label>
        <textarea v-model="description" id="description" rows="3" required></textarea>
      </div>

      <button @click="ajouterNouvelleDemande()">Ajouter votre demande</button>

    <h3>Demandes existantes</h3>
    <ul>
      <li v-for="demande in demandes" :key="demande.id_demande">
        <strong>Zone :</strong> {{ demande.zone }} <br />
        <strong>Nombre de personnes :</strong> {{ demande.nbPersonne }} <br />
        <strong>Description :</strong> {{ demande.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'UberFlippe',
  data() {
    return {
        zone: "",
        nbPersonne: "",
        description: "",
    };
  },
  computed : {
    ...mapState('UberFlippeStore',['demande', 'demandes'])
  },
  methods: {
    ...mapActions('UberFlippeStore', ['addDemande']),
    async ajouterNouvelleDemande() {
      if (this.zone && this.nbPersonne && this.description) {
        const nouvelleDemande = {
          zone: this.zone,
          nbPersonne: this.nbPersonne,
          description: this.description,
        };
        try {
          const response = await this.addDemande(nouvelleDemande);
          alert("Demande ajoutée avec succès !");
          console.log("Nouvelle demande :", response);
          this.zone = "";
          this.nbPersonne = "";
          this.description = "";
        } catch (error) {
          alert("Erreur lors de l'ajout de la demande : " + error.message);
        }
      } else {
        alert("Veuillez remplir tous les champs correctement.");
      }
    },
  },

};
</script>

<style scoped>
.demande-formulaire {
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

label {
  font-weight: bold;
}

input,
textarea {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 0.7em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1em;
}
</style>
