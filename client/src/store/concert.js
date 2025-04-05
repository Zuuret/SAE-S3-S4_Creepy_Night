import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ConcertService from "../services/concert.service";
import ValidArtiste from "../services/validArtiste.service";

import { getAllConcerts, getConcertbyId, getAllReservations, getPanier ,ajouterAuPanier, retirerDuPanier, viderDuPanier } from "@/services/concert.service"

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
                placeDansPanier.nb_places_panier = concert.nb_places_panier;
                placeDansPanier.prixTotal = Math.round(placeDansPanier.nb_places_panier * placeDansPanier.prix_place * 100) / 100;
            } else {
                const concertAvecInfos = {
                    ...concert,
                    prixTotal: concert.prix_place * concert.nb_places_panier,
                };
                state.panier.push(concertAvecInfos);
                console.log(state.panier);
                console.log("concert : ", concert)
            }
            state.concert.nb_places = concert.nb_places;
        },
        updateNbPlacesInPanier(state, nbPlaceMaj) {
            const index = state.panier.findIndex(item => item.panier_id === nbPlaceMaj.panier_id);
            if (index !== -1) {
                state.panier.splice(index, 1, {
                    ...nbPlaceMaj,
                    prixTotal: Math.round(nbPlaceMaj.nb_places_panier * nbPlaceMaj.prix_place * 100) / 100
                });
            }
            if (state.concert && state.concert.id === nbPlaceMaj.concert_id) {
                state.concert.nb_places += 1;
            }
        },
        retirerDuPanier(state, panier_item_id) {
            const placeDansPanier = state.panier.findIndex(item => item.panier_id === panier_item_id);
            if (placeDansPanier !== -1) {
                const removedItem = state.panier[placeDansPanier];
                console.log(removedItem)
                if (state.concert && state.concert.id === removedItem.concert_id) {
                    state.concert.nb_places += 1;
                }
                state.panier.splice(placeDansPanier, 1);
            }
        },
        viderPlace(state, panier_item_id) {
            const placeDansPanier = state.panier.find(item => item.panier_id === panier_item_id);
            console.log(placeDansPanier)
            if (placeDansPanier) {
                state.concert.nb_places += placeDansPanier.nb_places_panier;
                placeDansPanier.nb_places_panier = 0;
                placeDansPanier.prixTotal = 0;
                state.panier = state.panier.filter(item => item.panier_id !== panier_item_id);
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
        async getPanier({commit}, utilisateurId){
            console.log("Récupération du panier pour ID :", utilisateurId)
            let response = await getPanier(utilisateurId)
            if (response.error === 0) {
                commit('updatePanier', response.data)
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, concert) {
            console.log("Ajout dans le panier")
            let response = await ajouterAuPanier(concert);
            if (response.error === 0) {
                commit("ajouterAuPanier", response.data);
            } else {
                console.log(response.data);
            }
        },
        async retirerDuPanier({ commit }, concert) {
            console.log("Retrait dans le panier");
            let response = await retirerDuPanier(concert)
            if (response.data.removed) {
                commit("retirerDuPanier", concert.panier_id);
            } else {
                commit("updateNbPlacesInPanier", response.data);
            }
            console.log(response.data)
        },
        async viderPlace({ commit }, concert) {
            console.log("Supression dans le panier");
            let response = await viderDuPanier(concert)
            if (response.error === 0) {
                commit("viderPlace", concert.panier_id);
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