<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="container">
      <div class="formulaire-signalement">
        <h1>Effectuer un signalement</h1>
        <label for="incidents-selection">Sélectionnez le type d'incident :</label>
        <select v-model="typeIncident" id="incidents-selection" required>
          <option value="Objet perdu">Objet perdu</option>
          <option value="Comportement suspect">Comportement suspect</option>
          <option value="Comportement inapproprié">Comportement inapproprié</option>
          <option value="Problème technique">Problème technique</option>
          <option value="Danger environnemental">Danger environnemental</option>
        </select>

        <label for="description-incident">Description de l'incident</label>
        <textarea v-model="descriptionIncident" id="description-incident" name="description-incident" required></textarea>

        <label for="zone-selection">Sélectionnez la zone de l'incident :</label>
        <select v-model="zoneIncident" id="zone-selection" required>
          <option value="Foreffroi">La Foreffroi</option>
          <option value="Cauchemanoir">Le Cauchemanoir</option>
          <option value="Bosquepouvante">Le Bosquépouvante</option>
          <option value="Maudile">La Maudîle</option>
          <option value="Malaispace">La Malaispace</option>
        </select>

        <router-link to="/secuflippe/signalement">
          <button @click="soumissionSignalement">Valider votre signalement</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Swal from 'sweetalert2';
import { mapActions } from "vuex";

export default {
  name: "SecuFlippeSignalement",
  components: {
    NavBar,
  },
  data() {
    return {
      typeIncident: "",
      descriptionIncident: "",
      zoneIncident: "",
    };
  },
  methods: {
    ...mapActions(["addPositionGeographique", "addSignalement"]),
    async soumissionSignalement() {
      try {
        const positionUtilisateur = await this.addPositionGeographique();
        if (!positionUtilisateur || positionUtilisateur.error !== 0) {
          await Swal.fire({
            title: 'Erreur',
            text: 'Erreur lors de la géolocalisation. Activez-la pour continuer.',
            icon: 'error',
            confirmButtonText: 'OK',
            background: '#900c0c',
            color: '#fff',
          });
          return;
        }

        const nouveauSignalement = {
          typeIncident: this.typeIncident,
          descriptionIncident: this.descriptionIncident,
          zoneIncident: this.zoneIncident,
          positionUtilisateur: positionUtilisateur.data,
        };

        const signalement = await this.addSignalement(nouveauSignalement);
        if (signalement.error === 0) {
          await Swal.fire({
            title: 'Succès',
            text: 'Signalement ajouté avec succès !',
            icon: 'success',
            confirmButtonText: 'OK',
            background: '#570000',
            color: '#fff',
          });
          this.$router.push("/secuflippe");
        } else {
          await Swal.fire({
            title: 'Erreur',
            text: 'Erreur lors de l\'ajout du signalement.',
            icon: 'error',
            confirmButtonText: 'OK',
            background: '#570000',
            color: '#fff',
          });
        }
      } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        await Swal.fire({
          title: 'Erreur',
          text: 'Une erreur inattendue s\'est produite.',
          icon: 'error',
          confirmButtonText: 'OK',
          background: '#900c0c',
          color: '#fff',
        });
      }
    },
  }
};
</script>


<style scoped>
body {
  color: #eaeaea;
  font-family: 'Kanit', sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Conteneur principal */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(145deg, #3a0000, #570000);
}

/* Formulaire */
.formulaire-signalement {
  background: linear-gradient(145deg, #3a0000, #570000);
  border: 3px solid #b71c1c;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  position: relative;
  animation: fadeIn 1s ease-out;
}

/* Titre du formulaire */
.formulaire-signalement h1 {
  text-align: center;
  font-family: 'Creepster', cursive;
  font-size: 50px;
  color: #f6c700;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000;
  margin-bottom: 30px;
}

/* Champs de formulaire */
label {
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #f6c700;
  text-shadow: 0 1px 2px #000000;
}

select, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  border: 2px solid #900c0c;
  border-radius: 10px;
  background-color: #1a1a1a;
  color: #eaeaea;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
}

textarea {
  resize: none;
  height: 150px;
}

select:hover, textarea:hover {
  border-color: #e52d27;
}

select:focus, textarea:focus {
  outline: none;
  border-color: #f6c700;
}

/* Bouton */
button {
  width: 100%;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
  background: #f6c700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: #b71c1c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8), 0 0 10px #f6c700;
}

button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
}

/* Responsive */
@media (max-width: 768px) {
  .formulaire-signalement {
    padding: 20px;
  }

  .formulaire-signalement h1 {
    font-size: 40px;
  }

  label {
    font-size: 18px;
  }

  select, textarea {
    font-size: 16px;
  }

  button {
    font-size: 18px;
  }
}
</style>

