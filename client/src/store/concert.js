import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
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
                placeDansPanier.nbPlaces += nbPlaces;
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
        retirerDuPanier(state, { concertId }) {
            const placeDansPanier = state.panier.find(item => item.concertId === concertId);
            const placesConcert = state.places_concert.find(place => place.id_concert === concertId);
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
            const placesConcert = state.places_concert.find(place => place.id_concert === concertId);
            if (placeDansPanier && placesConcert) {
                placesConcert.nb_places += placeDansPanier.nbPlaces;
                placeDansPanier.nbPlaces = 0;
                placeDansPanier.prixTotal = 0;
                state.panier = state.panier.filter(item => item.concertId !== concertId);
            } else {
                console.log("Concert non trouvé dans le panier.");
            }
        },
        reserverConcert(state) {
            let reservation = {
                id: new Date().getTime(),
                userId: state.utilisateurConnecte.id,
                concerts: state.panier.map(item => ({
                    concertId: item.concertId,
                    nbPlaces: item.nbPlaces,
                    prixTotal: item.prixTotal,
                    concert: item.concert,
                    place: item.place
                })),
                total: state.panier.reduce((total, item) => total + item.prixTotal, 0),
                date: new Date().toLocaleString(),
            };
            state.reservations.push(reservation);
            state.panier = [];
            console.log("Réservation créée : ", reservation);
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
        async reserverConcert({ commit, dispatch, rootState, state }) {
            const totalPanier = state.panier.reduce((total, item) => total + item.prixTotal, 0);

            const utilisateurCo = rootState.ProfilStore.utilisateurConnecte;
            const soldeUtilisateur = utilisateurCo.solde;

            if (soldeUtilisateur >= totalPanier) {
                const data = {
                    idUser: utilisateurCo.id,
                    amount: -totalPanier,
                    operation: "Débit place concert",
                    details: "Réservation concert",
                };
                const response = await dispatch('ProfilStore/updateFunds', data, { root: true });
                if (response.success) {
                    commit('reserverConcert');
                    console.log("Réservation réussie !");
                } else {
                    console.log("Erreur lors de la mise à jour des fonds :", response.errorMessage || "Erreur inconnue");
                }
            } else {
                console.log("Solde insuffisant pour la réservation.");
            }
        },
        async getReservationConcertById({commit}, utilisateurId){
            console.log("Récupération des commande de ID :", utilisateurId)
            let response = await ConcertService.getReservationConcertById(utilisateurId)
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