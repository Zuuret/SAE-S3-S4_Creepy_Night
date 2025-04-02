<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <h1>{{ $t('carihorreur.titre') }}</h1>
    <div class="container">
      <div class="formulaire-signalement">
        <h1>{{ $t('carihorreur.reservationTitre') }}</h1>

        <label for="date-selection">{{ $t('carihorreur.dateSelection') }}</label>
        <input type="date" v-model="dateCarre" id="date-selection" :min="'2025-10-27'" :max="'2025-11-02'" required />

        <label for="carre-selection">{{ $t('carihorreur.formuleSelection') }}</label>
        <select v-model="idCarre" id="carre-selection" required>
          <option v-for="carre in carres" :value="carre.id_carre" :key="carre.id_carre">
            {{ carre.type }}
          </option>
        </select>

        <label for="nbpersonne-selection">{{ $t('carihorreur.nbPersonneSelection') }}</label>
        <select v-model="nbPersonne" id="nbpersonne-selection" required>
          <option v-for="n in 7" :value="n" :key="n">{{ n }}</option>
        </select>

        <label for="bouteille-type">{{ $t('carihorreur.bouteilleType') }}</label>
        <select v-model="idBouteille" id="bouteille-type" required>
          <option v-for="bouteille in bouteilles" :value="bouteille.id_bouteille" :key="bouteille.id_bouteille">
            {{ bouteille.type }}
          </option>
        </select>

        <label for="bouteille-quantite">{{ $t('carihorreur.bouteilleQuantite') }}</label>
        <select v-model="bouteilleQuantite" id="bouteille-quantite" required>
          <option v-for="n in 4" :value="n" :key="n">{{ n }}</option>
        </select>

        <button @click="addReservation">{{ $t('carihorreur.validerReservation') }}</button>
      </div>

      <div class="reservation-list">
        <h2>{{ $t('carihorreur.reservationsTitre') }}</h2>
        <ul>
          <li v-for="(reservation, index) in reservations" :key="reservation.id_reservation">
            <div>
              <span v-if="reservation.carre && carres.length">
                {{ reservation.dateCarre }} - {{ reservation.carre.type || $t('carihorreur.typeIndefini') }}
                ({{ reservation.nbPersonne }} {{ $t('carihorreur.personnes') }}) - Total : {{ reservation.prixTotal || $t('carihorreur.inconnu') }} €
              </span>
              <ul v-if="reservation.bouteilles && reservation.bouteilles.length">
                <li v-for="bouteille in reservation.bouteilles" :key="bouteille.id_bouteille">
                  {{ bouteille.type }} x {{ bouteille.quantite }} ({{ bouteille.totalPrix }} €)
                </li>
              </ul>
              <button @click="confirmCancel(index)">{{ $t('carihorreur.annulerReservation') }}</button>
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
      idCarre: "",
      nbPersonne: "",
      idBouteille: "",
      bouteilleQuantite: "",
    };
  },
  computed: {
    ...mapState("CarihorreurStore", ["bouteilles","bouteille", "carres", "carre", "reservations"]),
  },
  methods: {
    ...mapActions("CarihorreurStore", ["getAllBouteilles", "getBouteillebyId", "getAllCarres","getCarrebyId","getReservationCarihorreur", "addReservationToStore"]),
    async addReservation() {
      if (this.dateCarre && this.idCarre && this.nbPersonne && this.bouteilleQuantite && this.idBouteille) {
        await this.getBouteillebyId(this.idBouteille);
        await this.getCarrebyId(this.idCarre);
        const bouteille = this.bouteille;
        const carre = this.carre;
        if (!bouteille || !carre) {
          alert("Erreur : Impossible de récupérer les informations sélectionnées.");
          return;
        }
        const bouteillePrixTotal = parseInt(this.bouteilleQuantite) * bouteille.prix;
        const prixCarre = (carre.prix || 0) + (carre.prixPersonne || 0) * this.nbPersonne;
        const prixTotal = bouteillePrixTotal + prixCarre;
        await this.addReservationToStore({
          dateCarre: this.dateCarre,
          carre: {
            id_carre: carre.id_carre,
            type: carre.type,
            prix: prixCarre,
          },
          nbPersonne: parseInt(this.nbPersonne),
          bouteilles: [
            {
              id_bouteille: bouteille.id_bouteille,
              type: bouteille.type,
              prix: bouteille.prix,
              quantite: parseInt(this.bouteilleQuantite),
              totalPrix: bouteillePrixTotal,
            },
          ],
          prixTotal,
        });
        alert("Votre réservation a été ajoutée !");
        this.resetForm();
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    }
    ,
    resetForm() {
      this.dateCarre = "";
      this.idCarre = "";
      this.nbPersonne = "";
      this.idBouteille = "";
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
  async mounted() {
    await this.getAllBouteilles();
    await this.getAllCarres();
    await this.getReservationCarihorreur();
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

