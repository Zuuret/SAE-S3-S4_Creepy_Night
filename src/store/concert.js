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
        addPanier(state, { concert, place, quantite }) {
            const existingItem = state.panier.find(
                item => item.concert.id === concert.id && item.place.type_place === place.type_place
            );
            if (existingItem) {
                existingItem.quantite += quantite;
            } else {
                state.panier.push({ concert, place, quantite });
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
        async getPanier({commit}){
            console.log("Récupération du panier");
            let response = await ConcertService.getPanier();
            if (response.error === 0) {
                commit('updatePanier', response.data);
            } else {
                console.log(response.data);
            }
        },
        async addAuPanier({ commit }, { concertId, placeType, quantite }) {
            console.log("Ajout au panier en cours...");
            let response;
            response = await ConcertService.addAuPanier(concertId, placeType, quantite);
            if (response.error === 0) {
                commit('addPanier', { concertId, placeType, quantite });
                console.log("Ajout au panier réussi.");
            } else {
                console.error(response.data);
            }
            if (!concertId || !placeType) {
                console.error("Concert ou place introuvable.");
                return;
            }
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