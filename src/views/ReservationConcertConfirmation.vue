<template>
  <div class="concert">
    <div class="background">
      <img :src="concert.image" alt="Affiche du concert" class="affiche_concert" />
    </div>

    <div class="concert_info">
      <div v-if="concert">
        <p class="nom_artiste">{{ concert.artiste }}</p>
        <p class="categorie_artiste">{{ concert.categorie }} - {{ concert.nationalite }}</p>
        <p class="info_concert">{{ concert.date }} - {{ concert.heure }}</p>
        <p class="scene_concert">{{ concert.scene }}</p>
      </div>

      <div class="ticket">
        <h3>Places disponibles :</h3>
        <div v-if="places_concert.length > 0">
          <p>
            <strong>Type :</strong> {{ places_concert[0].type_place }} <br/>
            <strong>Prix :</strong> {{ places_concert[0].prix_place }} €<br/>
            <strong>Disponibles :</strong> {{ places_concert[0].nb_places }}
          </p>
          <label for="selection_quantite">QUANTITÉ</label>
          <input type="number" v-model.number="quantite" id="selection_quantite" min="0" :max="7" step="1"/>
        </div>
        <div v-else>
          <p>Aucune place disponible pour ce concert.</p>
        </div>
        <div class="ticket-total">
          <p><strong>TOTAL :</strong> {{ prixTotal }} €</p>
          <button @click="ajouterAuPanier">AJOUTER AU PANIER</button>
        </div>
      </div>
      <PanierConcert></PanierConcert>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PanierConcert from "@/components/PanierConcert.vue";

export default {
  name: 'ReservationConcertConfirmation',
  components: {PanierConcert},
  data() {
    return {
      quantite: 0,
    };
  },
  computed: {
    ...mapState('ConcertStore', ['concert', 'places_concert']),
    prixTotal() {
      return this.places_concert[0] ? this.places_concert[0].prix_place * this.quantite : 0;
    },
  },
  methods: {
    ...mapActions('ConcertStore', ['getConcertbyId', 'getPlacesConcerts', 'ajouterAuPanier']),
    ajouterAuPanier() {
      if (this.quantite <= 0) {
        alert('Veuillez sélectionner une quantité valide.');
      } else {
        this.ajouterAuPanier({  // Utilisation de "ajouterAuPanier"
          concertId: this.concert.id,
          nbPlaces: this.quantite
        }).then(() => {
          alert(`${this.quantite} place(s) ajoutée(s) au panier.`);
          this.quantite = 0;
        }).catch(error => {
          alert("Erreur lors de l'ajout au panier.");
          console.error(error);
        });
      }
    },
  },
  mounted() {
    const concertId = parseInt(this.$route.params.id);
    this.getConcertbyId(concertId);
    this.getPlacesConcerts(concertId);
  },
};
</script>

<style scoped>
.concert {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.concert_info {
  position: relative;
  z-index: 2;
  color: #b71c1c;
}
.nom_artiste {
  margin: 35px 0 0 40px;
  font-size: 80px;
  text-transform: uppercase;
  font-family: Blippo, fantasy;
  -webkit-text-stroke: 2px black;
}
.categorie_artiste {
  margin: 0 0 0 42px;
  font-size: 50px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
  -webkit-text-stroke: 2px black;
}
.info_concert {
  margin: 15px 0 0 42px;
  font-size: 35px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
  -webkit-text-stroke: 2px black;
}
.scene_concert {
  margin: 15px 0 0 42px;
  font-size: 35px;
  text-transform: uppercase;
  font-family: Stencil Std, fantasy;
  -webkit-text-stroke: 2px black;
}
.ticket {
  position: absolute;
  margin: 25px 0 0 37px;
  height: auto;
  width: 23%;
  padding: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.4));
  border: 3px solid #b71c1c;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  cursor: context-menu;
}
.ticket h3 {
  font-size: 35px;
  color: #b71c1c;
  font-family: "Stencil Std", fantasy;
  text-transform: uppercase;
  margin: 0;
}
.ticket p {
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
  color: #333;
  font-family: Stencil Std, fantasy;
  text-transform: uppercase;
  line-height: 1.6;
  letter-spacing: 1px;
}
.ticket label {
  font-size: 25px;
  font-weight: bold;
  font-family: Stencil Std, fantasy;
  text-align: center;
  color: #b71c1c;
  margin-bottom: 10px;
  display: block;
  letter-spacing: 1px;
}
.ticket input[type="number"] {
  width: 100%;
  font-size: 18px;
  font-family: Stencil Std, fantasy;
  border: 2px solid #b71c1c;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
.ticket input[type="number"]:hover {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.ticket input[type="number"]:focus {
  outline: none;
  border-color: #880e0e;
  box-shadow: 0 0 8px rgba(183, 28, 28, 0.5);
}
.ticket .ticket-total {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  color: #b71c1c;
}
.ticket button {
  width: 100%;
  padding: 12px;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  font-family: "Stencil Std", fantasy;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.ticket button:hover {
  background-color: #880e0e;
  transform: scale(1.05);
}
</style>
