import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

import ConcertService from "../services/concert.service";
import ValidArtiste from "../services/validArtiste.service";

export default ({
    namespaced: true,
    state: {
        artistes: [],
        artiste: [],
        concert: null,
        concerts: [],
        places_concert: [],
        panier: [],
        coordonneesBancaire: null,
    },
    mutations: {
        updateConcertById(state, concert){
            state.concert = concert;
        },
        updateListeConcert(state, concerts){
            state.concerts = concerts;
        },
        updateListePlaceConcert(state, places_concert){
            state.places_concert = places_concert;
        },
        updatePanier(state, panier) {
            state.panier = panier;
        },
        ajouterAuPanier(state, { concertId, nbPlaces, concert, place }) {
            const placeDansPanier = state.panier.find(item => item.concertId === concertId);
            if (placeDansPanier) {
                placeDansPanier.nbPlaces += nbPlaces;
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * place.prix_place;
            } else {
                state.panier.push({
                    concertId: concertId,
                    nbPlaces: nbPlaces,
                    prixTotal: nbPlaces * place.prix_place,
                    concert: concert,
                    place: place,
                });
            }
        },
        retirerDuPanier(state, { concertId, nbPlaces }) {
            const index = state.panier.findIndex(item => item.concertId === concertId);
            if (index !== -1) {
                state.panier[index].nbPlaces -= nbPlaces;
                state.panier[index].prixTotal = state.panier[index].nbPlaces * state.panier[index].place.prix_place;
                if (state.panier[index].nbPlaces <= 0) {
                    state.panier.splice(index, 1);
                }
            }
        },
        updateListeArtistes(state, artistes){
            state.artistes = artistes;
        },
        updateArtiste(state, artiste){
            state.artiste = artiste;
        },
        updateCoordonneesBancaire(state, coordonneesBancaire){
            state.coordonneesBancaire = coordonneesBancaire;
        },
    },
    actions: {
        async getAllConcert({commit}){
            console.log("Récupération des concerts");
            let response = await ConcertService.getAllConcerts();
            if (response.error === 0) {
                commit('updateListeConcert', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getConcertbyId({commit}, concertId){
            console.log("Récupération du concert ID : ", concertId);
            let response = await ConcertService.getConcertbyId(concertId);
            if (response.error === 0) {
                commit('updateConcertById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPlacesConcerts({ commit }, concertId) {
            console.log("Récupération des places de concerts pour le concert ID : ", concertId);
            let response = await ConcertService.getPlacesConcerts(concertId);
            if (response.error === 0) {
                commit('updateListePlaceConcert', response.data);
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, { concertId, nbPlaces }) {
            console.log("Ajout dans le panier")
            let responseConcert = await ConcertService.getConcertbyId(concertId);
            let responsePlaceConcert = await ConcertService.getPlacesConcerts(concertId);
            if (responseConcert.error === 0 || responsePlaceConcert.error === 0) {
                commit("ajouterAuPanier", {
                    concertId,
                    nbPlaces,
                    prixTotal: nbPlaces * responsePlaceConcert.prix_place,
                    concert: responseConcert.data,
                    place: responsePlaceConcert.data
                });
            } else {
                console.log(responseConcert.data);
                console.log(responsePlaceConcert.data)
            }
        },
        async retirerDuPanier({ commit }, { concertId, nbPlaces }) {
            console.log("Retrait dans le panier");
            commit("retirerDuPanier", { concertId, nbPlaces });
        },
        async calculerTotal() {
            return ConcertService.calculerTotal();
        },
        async getArtistes({ commit }) {
            console.log("Récupération des artistes");
            let response = await ValidArtiste.getArtistes();
            if (response.error === 0) {
                commit('updateListeArtistes', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setDecision({commit}, artiste) {
            console.log("Récupération des artistes");
            let response = await ValidArtiste.setDecision(artiste);
            if (response.error === 0) {
                commit('updateArtiste', response.data);
            } else {
                console.log(response.data);
            }
        },
        async validerPaiement({commit}, data){
            console.log("enregistrement de nouvelles données bancaire")
            let response = await controller.validerPaiement(data);
            if(response.error === 0){
                commit('updateCoordonneesBancaire', response.data);
                return true;
            } else {
                console.log(response.data);
            }
        },
    }
})