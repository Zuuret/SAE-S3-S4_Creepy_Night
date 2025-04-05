import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ConcertService from "../services/concert.service";
import ValidArtiste from "../services/validArtiste.service";

import { getAllConcerts, getConcertbyId, getAllReservations, ajouterAuPanier, retirerDuPanier } from "@/services/concert.service"

export default ({
    namespaced: true,
    state: {
        concerts: [],
        concert: null,
        artistes: [],
        artiste: [],
        panier: [],
        reservations: [],
        reservationsId: [],
        utilisateurConnecte: JSON.parse(localStorage.getItem("utilisateurConnecte")) || null,
    },
    getters: {
        allReservations: (state) => state.reservations
    },
    mutations: {
        updateListeConcert(state, concerts){
            state.concerts = concerts;
        },
        updateConcertById(state, concert){
            state.concert = concert;
        },
        updatePanier(state, panier) {
            state.panier = panier;
        },
        ajouterAuPanier(state, concert) {
            let placeDansPanier = state.panier.find(item => item.panier_id === concert.panier_id);
            if (placeDansPanier) {
                placeDansPanier.nb_places_panier += 1;
                placeDansPanier.prixTotal = placeDansPanier.nb_places_panier * placeDansPanier.prix_place;
            } else {
                const concertAvecInfos = {
                    ...concert,
                    prixTotal: concert.prix_place * concert.nb_places_panier,
                };
                state.panier.push(concertAvecInfos);
                console.log(state.panier);
            }
            state.nb_places -= 1;
        },
        retirerDuPanier(state, panier_item_id) {
            const placeDansPanier = state.panier.find(item => item.panier_id === panier_item_id);
            if (placeDansPanier !== -1) {
                const removedItem = state.panier[placeDansPanier];
                if (state.concert && state.concert.id === removedItem.concert_id) {
                    state.concert.nb_places += 1;
                }
                state.panier.splice(placeDansPanier, 1);
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
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
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
            let response = await getAllConcerts();
            console.log(response.data);
            if (response.error === 0) {
                commit('updateListeConcert', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getConcertbyId({commit}, uuid){
            console.log("Récupération du concert ID : ", uuid);
            let response = await getConcertbyId(uuid);
            if (response.error === 0) {
                commit('updateConcertById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, concert) {
            console.log("Ajout dans le panier")
            let response = await ajouterAuPanier(concert);
            console.log("Response : ", response.data)
            if (response.error === 0) {
                commit("ajouterAuPanier", response.data);
            } else {
                console.log(response.data);
            }
        },
        async retirerDuPanier({ commit }, panier_item_id) {
            console.log("Retrait dans le panier");
            let response = await retirerDuPanier(panier_item_id)
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
        async fetchReservations({ commit }) {
            const response = await getAllReservations();
            if (response.error === 0) {
                commit('SET_RESERVATIONS', response.data);
            }
            return response;
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