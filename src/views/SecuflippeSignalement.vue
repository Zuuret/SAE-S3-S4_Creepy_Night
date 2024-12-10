<template>
  <div>
    <div class="fog"></div>
    <div class="light-effect"></div>
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
/* Styles généraux */
body {
  background: radial-gradient(circle at center, #000000, #0d0d0d, #1a1a1a);
  color: #eaeaea;
  font-family: 'Creepster', cursive, Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

h1 {
  text-align: center;
  font-size: 50px;
  color: #e52d27;
  text-shadow: 0 0 10px #e52d27, 0 0 20px #ff0000;
  margin-bottom: 20px;
}

/* Container principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 50px;
}

/* Formulaire */
.formulaire-signalement {
  background: linear-gradient(145deg, #3a0000, #570000);
  border: 2px solid #b71c1c;
  border-radius: 10px;
  padding: 20px 40px;
  max-width: 700px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  position: relative;
}

/* Bordures sanglantes */
.formulaire-signalement::before,
.formulaire-signalement::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  background: repeating-linear-gradient(
      to bottom,
      #b71c1c 0%,
      #900c0c 50%,
      #570000 100%
  );
  top: 0;
  animation: dripping 3s infinite ease-in-out;
}

.formulaire-signalement::before {
  left: -10px;
}

.formulaire-signalement::after {
  right: -10px;
}

/* Gouttes sanglantes */
@keyframes dripping {
  0% {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10%);
  }
}

/* Labels */
label {
  font-size: 1.2em;
  font-weight: bold;
  color: #f6c700;
  display: block;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px #000000;
}

/* Inputs et Selects */
select,
input[type="text"],
textarea {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 2px solid #900c0c;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #eaeaea;
  font-size: 16px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
}

textarea {
  resize: none;
  height: 150px;
}

select:hover,
input[type="text"]:hover,
textarea:hover {
  border-color: #e52d27;
}

select:focus,
input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #f6c700;
}

/* Boutons */
button {
  background: linear-gradient(145deg, #e52d27, #900c0c);
  color: #eaeaea;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

button:hover {
  background: #f6c700;
  color: #1a1a1a;
  transform: scale(1.1);
  box-shadow: 0 0 20px #f6c700;
}

button:active {
  background: #570000;
  box-shadow: 0 0 10px #900c0c;
}

/* Effet de texte */
button::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;
}

/* Ombres fantomatiques */
.formulaire-signalement:hover {
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.5), 0 0 60px rgba(0, 0, 0, 0.7);
}

</style>

