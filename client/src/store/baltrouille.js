import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import BaltrouilleService from "../services/baltrouille.service";

export default ({
    namespaced: true,
    state: {
        deguisements: [],
        deguisement: null,
        taille_deguisements: []
    },
    mutations: {
        updateListeDeguisement(state, deguisements){
            state.deguisements = deguisements
        },
        updateDeguisementById(state, deguisement){
            state.deguisement = deguisement
        },
        updateListeTailleDeguisement(state, taille_deguisements){
            state.taille_deguisements = taille_deguisements;
        },
    },
    actions: {
        async getAllDeguisement({commit}){
            console.log("Récupération des déguisements");
            let response = await BaltrouilleService.getAllDeguisement();
            if (response.error === 0) {
                commit('updateListeDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getDeguisementById({commit}, deguisementId){
            console.log("Récupération du déguisement ID : ",deguisementId);
            let response = await BaltrouilleService.getDeguisementById(deguisementId);
            if (response.error === 0) {
                commit('updateDeguisementById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getTailleDeguisement({ commit }, deguisementId) {
            console.log("Récupération des tailles pour le déguisement ID : ", deguisementId);
            let response = await BaltrouilleService.getTailleDeguisement(deguisementId);
            if (response.error === 0) {
                commit('updateListeTailleDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})