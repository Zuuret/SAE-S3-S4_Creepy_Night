import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

import SignalementService from "../services/signalement.service";

export default ({
    namespaced: true,
    state: {
        positionUtilisateur: null,
        signalement: [],
        signalements: [],
    },
    mutations: {
        updatePositionUtilisateur(state, positionUtilisateur){
            state.positionUtilisateur = positionUtilisateur;
        },
        addSignalement(state, nouveauSignalement) {
            if (!state.signalement) {
                state.signalement = [];
            }
            state.signalement.push(nouveauSignalement);
        },
        updateListeSignalement(state, signalements){
            state.signalements = signalements;
        },
    },
    actions: {
        async addPositionGeographique({ commit }) {
            console.log("Enregistrement de la localisation de l'utilisateur");
            let response = await controller.addPositionGeographique();
            if (response.error === 0) {
                commit("updatePositionUtilisateur", response.data);
                return response;
            } else {
                console.log(response.data)
                return response;
            }
        },
        async addSignalement({ commit }, data) {
            console.log("Ajout d'un signalement :", data);
            let response = await controller.addSignalement(data);
            if (response.error === 0) {
                commit("addSignalement", response.data);
            }
            console.log(response.data)
            return response;
        },
        async getAllSignalements({commit}){
            console.log("Récupération des signalements")
            let response = await SignalementService.getAllSignalements();
            if (response.error === 0){
                commit("updateListeSignalement", response.data);
            } else {
                console.log(response.data)
            }
        },
    }
})