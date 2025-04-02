<template>
  <div class="demande-formulaire">
    <h2>{{ $t('uber_flippe_form') }}</h2>
      <div>
        <label for="zone-selection">{{ $t('select_incident_area') }} :</label>
        <select v-model="zone" id="zone-selection" required>
          <option value="Foreffroi">{{ $t('la_foreffroi') }}</option>
          <option value="Cauchemanoir">{{ $t('le_cauchemanoir') }}</option>
          <option value="Bosquepouvante">{{ $t('le_bosquepouvante') }}</option>
          <option value="Maudile">{{ $t('la_maudile') }}</option>
          <option value="Malaispace">{{ $t('la_malaispace') }}</option>
        </select>
      </div>

      <div>
        <label for="nbPersonne">{{ $t('number_of_people') }} :</label>
        <input v-model.number="nbPersonne" type="number" id="nbPersonne" min="1" required />
      </div>

      <div>
        <label for="description">{{ $t('description') }} :</label>
        <textarea v-model="description" id="description" rows="3" required></textarea>
      </div>

      <button @click="ajouterNouvelleDemande()">{{ $t('add_request') }}</button>

    <h3>{{ $t('existing_requests') }}</h3>
    <ul>
      <li v-for="demande in demandes" :key="demande.id_demande">
        <strong>{{ $t('area') }} :</strong> {{ demande.zone }} <br />
        <strong>{{ $t('number_of_people') }} :</strong> {{ demande.nbPersonne }} <br />
        <strong>{{ $t('description') }} :</strong> {{ demande.description }}
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
