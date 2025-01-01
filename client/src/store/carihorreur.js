import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import CarihorreurServices from '../services/carihorreur.services';

export default {
    namespaced: true,
    state: {
        reservations: [],
    },
    mutations: {
        updateReservations(state, reservations) {
            state.reservations = reservations;
        },
        addReservation(state, reservation) {
            state.reservations.push(reservation);
            console.log("Ajout d'une nouvelle réservation :", reservation);
        }
    },
    actions: {
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
