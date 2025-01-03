import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

import ConcertService from "../services/concert.service";
import ValidArtiste from "../services/validArtiste.service";

export default ({
    namespaced: true,
    state: {
        concerts: [],
        concert: null,
        artistes: [],
        artiste: [],
        place_concert: null,
        places_concert: [],
        panier: [],
        coordonneesBancaire: null,
    },
    mutations: {
        updateListeConcert(state, concerts){
            state.concerts = concerts;
        },
        updateConcertById(state, concert){
            state.concert = concert;
        },
        updateListePlaceConcert(state, places_concert){
            state.places_concert = places_concert;
        },
        updatePlaceConcertById(state, place_concert){
            state.place_concert = place_concert
        },
        updatePanier(state, panier) {
            state.panier = panier;
        },
        ajouterAuPanier(state, { concertId, nbPlaces, concert, place }) {
            const prixPlace = Array.isArray(place) ? place[0]?.prix_place : place.prix_place;
            if (typeof prixPlace !== "number") {
                console.log("Prix place invalide :", prixPlace);
                return;
            }
            const placeDansPanier = state.panier.find(item => item.concertId === concertId);
            if (placeDansPanier) {
                placeDansPanier.nbPlaces += nbPlaces;
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * prixPlace;
            } else {
                state.panier.push({
                    concertId: concertId,
                    nbPlaces: nbPlaces,
                    prixTotal: nbPlaces * prixPlace,
                    concert: concert,
                    place: place,
                });
            }
        },
        retirerDuPanier(state, { concertId }) {
            const placeDansPanier = state.panier.find(item => item.concertId === concertId);
            const placesConcert = state.place_concert.find(place => place.id_concert === concertId);
            console.log(placesConcert)
            if (placeDansPanier && placesConcert) {
                placeDansPanier.nbPlaces -= 1;
                placesConcert.nb_places += 1;
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * placeDansPanier.place[0].prix_place;
                if (placeDansPanier.nbPlaces <= 0) {
                    state.panier = state.panier.filter(item => item.concertId !== concertId);
                }
            } else {
                console.log("Concert non trouvé dans le panier ou dans la liste des concerts.");
            }
        },
        viderPlace(state, { concertId }) {
            const placeDansPanier = state.panier.find(item => item.concertId === concertId);
            const placesConcert = state.place_concert.find(place => place.id_concert === concertId);
            if (placeDansPanier && placesConcert) {
                placesConcert.nb_places += placeDansPanier.nbPlaces;
                placeDansPanier.nbPlaces = 0;
                placeDansPanier.prixTotal = 0;
                state.panier = state.panier.filter(item => item.concertId !== concertId);
            } else {
                console.log("Concert non trouvé dans le panier.");
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
        async getAllPlacesConcert({commit}){
            console.log("Récupération des places de concert");
            let response = await ConcertService.getAllPlaceConcert();
            if (response.error === 0) {
                commit('updateListePlaceConcert', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPlacesConcertsbyId({ commit }, concertId) {
            console.log("Récupération des places de concerts pour le concert ID : ", concertId);
            let response = await ConcertService.getPlacesConcertsbyId(concertId);
            if (response.error === 0) {
                commit('updatePlaceConcertById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, { concertId, nbPlaces }) {
            console.log("Ajout dans le panier")
            let responseConcert = await ConcertService.getConcertbyId(concertId);
            let responsePlaceConcert = await ConcertService.getPlacesConcertsbyId(concertId);
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
        async retirerDuPanier({ commit }, { concertId }) {
            let responseConcert = await ConcertService.getPlacesConcertsbyId(concertId);
            if (responseConcert.error === 0){
                console.log("Retrait dans le panier");
                commit("retirerDuPanier", { concertId });
            }
        },
        async viderPlace({ commit }, { concertId }) {
            let responseConcert = await ConcertService.getPlacesConcertsbyId(concertId);
            if (responseConcert.error === 0) {
                console.log("Supression dans le panier");
                commit("viderPlace", {concertId});
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