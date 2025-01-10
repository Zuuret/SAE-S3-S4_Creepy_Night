import Vue from 'vue'
import Vuex from 'vuex'

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
        reservations: [],
        reservationsId: [],
        utilisateurConnecte: JSON.parse(localStorage.getItem("utilisateurConnecte")) || null,
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
        ajouterAuPanier(state, { placeId, nbPlaces, concert, place }) {
            let placeDansPanier = state.panier.find(item => item.placeId === placeId);
            if (placeDansPanier) {
                placeDansPanier.nbPlaces = nbPlaces
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * place.prix_place;
            } else {
                state.panier.push({
                    placeId: placeId,
                    nbPlaces: nbPlaces,
                    prixTotal: nbPlaces * place.prix_place,
                    concert: concert,
                    place: place,
                });
            }
        },
        retirerDuPanier(state, { placeId }) {
            const placeDansPanier = state.panier.find(item => item.placeId === placeId);
            const placesConcert = state.places_concert.find(place => place.id_concert === placeId);
            if (placeDansPanier && placesConcert) {
                placeDansPanier.nbPlaces -= 1;
                placesConcert.nb_places += 1;
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * placeDansPanier.place.prix_place;
                if (placeDansPanier.nbPlaces <= 0) {
                    state.panier = state.panier.filter(item => item.placeId !== placeId);
                }
            }
        },
        viderPlace(state, { placeId }) {
            const placeDansPanier = state.panier.find(item => item.placeId === placeId);
            const placesConcert = state.places_concert.find(place => place.id_concert === placeId);
            if (placeDansPanier && placesConcert) {
                placesConcert.nb_places += placeDansPanier.nbPlaces;
                placeDansPanier.nbPlaces = 0;
                placeDansPanier.prixTotal = 0;
                state.panier = state.panier.filter(item => item.placeId !== placeId);
            } else {
                console.log("Concert non trouvé dans le panier.");
            }
        },
        reserverConcert(state, reservation) {
            state.reservations.push(reservation);
            state.reservationsId.push(reservation.id_reservation);
            state.panier = [];
        },
        updateReservationConcertId(state, reservationsId){
            state.reservationsId = reservationsId
            console.log(reservationsId)
        },
        updateListeArtistes(state, artistes){
            state.artistes = artistes;
        },
        updateArtiste(state, artiste){
            state.artiste = artiste;
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
        async getPlacesConcertsbyId({ commit }, placeId) {
            console.log("Récupération des places de concerts pour le concert ID : ", placeId);
            let response = await ConcertService.getPlacesConcertsbyId(placeId);
            if (response.error === 0) {
                commit('updatePlaceConcertById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, { placeId, nbPlaces }) {
            console.log("Ajout dans le panier")
            let response = await ConcertService.ajouterAuPanier(placeId, nbPlaces)
            if (response.error === 0) {
                commit("ajouterAuPanier", response.data);
            } else {
                console.log(response.data);
            }
        },
        async retirerDuPanier({ commit }, { placeId }) {
            console.log("Retrait dans le panier");
            let response = await ConcertService.retirerDuPanier(placeId)
            if (response.error === 0){
                commit("retirerDuPanier", response.data);
            } else {
                console.log(response.data)
            }
        },
        async viderPlace({ commit }, { placeId }) {
            console.log("Supression dans le panier");
            let response = await ConcertService.viderPlace(placeId)
            if (response.error === 0) {
                commit("viderPlace", response.data);
            } else {
                console.log(response.data)
            }
        },
        async reserverConcert({ commit }, idUser) {
            console.log("Ajout d'une reservation pour ID :", idUser);
            let response = await ConcertService.addReservationConcert(idUser);
            if (response.error === 0) {
                commit('reserverConcert', response.data.newRes);
                commit('ProfilStore/updateSoldeUtilisateur', response.data.solde, { root: true });
            } else {
                console.error(response.data);
            }
        },
        async getReservationConcertById({commit}, utilisateurId){
            console.log("Récupération des commande de ID :", utilisateurId)
            let response = await ConcertService.getReservationConcertById(utilisateurId)
            console.log('Response :', response)
            if (response.error === 0) {
                commit('updateReservationConcertId', response.data);
            } else {
                console.log(response.data);
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
    }
})