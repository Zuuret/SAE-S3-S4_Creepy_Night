import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import CarihorreurServices from '../services/carihorreur.services';

export default {
    namespaced: true,
    state: {
        bouteilles: [],
        bouteille: null,
        carres: [],
        carre: null,
        reservations: [],
    },
    mutations: {
        updateListeBouteilles(state, bouteilles){
            state.bouteilles = bouteilles
        },
        updateBouteille(state, bouteille){
            state.bouteille = bouteille
        },
        updateListeCarres(state, carres){
            state.carres = carres
        },
        updateCarre(state, carre){
            state.carre = carre
            console.log(carre)
        },
        updateReservations(state, reservations) {
            state.reservations = reservations;
            console.log(reservations)
        },
        addReservation(state, reservation) {
            state.reservations.push(reservation);
            console.log("Ajout d'une nouvelle réservation :", reservation);
        }
    },
    actions: {
        async getAllBouteilles({commit}){
            console.log("Récupération de la liste de bouteilles");
            let response = await CarihorreurServices.getAllBouteilles();
            if (response.error === 0){
                commit('updateListeBouteilles', response.data)
            } else {
                console.log("Erreur lors de la récupération de la liste de bouteilles :", response.data)
            }
        },
        async getBouteillebyId({commit}, bouteilleId){
            console.log("Récupération de la bouteille d'ID : ", bouteilleId);
            let response = await CarihorreurServices.getBouteillebyId(bouteilleId);
            if (response.error === 0) {
                commit('updateBouteille', response.data);
            } else {
                console.log("Erreur lors de la récupération de la bouteille :", response.data);
            }
        },
        async getAllCarres({commit}){
            console.log("Récupération de la liste des carres");
            let response = await CarihorreurServices.getAllCarres();
            if (response.error === 0){
                commit('updateListeCarres', response.data)
            } else {
                console.log("Erreur lors de la récupération de la liste de carres :", response.data)
            }
        },
        async getCarrebyId({commit}, carreId){
            console.log("Récupération du carre d'ID : ", carreId);
            let response = await CarihorreurServices.getCarrebyId(carreId);
            if (response.error === 0) {
                commit('updateCarre', response.data);
            } else {
                console.log("Erreur lors de la récupération du carre :", response.data);
            }
        },
        async getReservationCarihorreur({ commit }, id) {
            console.log("Récupération des réservations pour l'ID : ", id)
            let response = await CarihorreurServices.getReservationCarihorreur(id);
            if (response.error === 0) {
                commit('updateReservations', response.data);
            } else {
                console.log("Erreur lors de la récupération des réservations :", response.data);
            }
        },
        async addReservationToStore({ commit }, reservation) {
            commit("addReservation", reservation);
            console.log("Réservation ajoutée avec succès dans le store !");
        },
    }
};
