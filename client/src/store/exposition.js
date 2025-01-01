import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ExpoOeuvres from "../services/expoOeuvres.services";

export default ({
    namespaced: true,
    state: {
        oeuvres: [],
        oeuvre: [],
    },
    mutations: {
        updateListeOeuvres(state, oeuvres){
            state.oeuvres = oeuvres;
        },
        updateOeuvre(state, oeuvre){
            state.oeuvre = oeuvre;
        },
    },

    actions: {
        async getOeuvres({ commit }) {
            console.log("Récupération des oeuvres");
            let response = await ExpoOeuvres.getOeuvres();
            if (response.error === 0) {
                commit('updateListeOeuvres', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setOeuvre({commit}, oeuvre) {
            console.log("Demande d'emplacement envoyée");
            let response = await ExpoOeuvres.setOeuvre(oeuvre);
            if (response.error === 0) {
                commit('updateOeuvre', response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})