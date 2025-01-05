import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import UberFlippeService from "@/services/uberflippe.service";

export default ({
    namespaced: true,
    state: {
        demandes: [],
        demande: null
    },
    mutations: {
        addDemandeUberFlippe(state, nouvelleDemande) {
            state.demandes.push(nouvelleDemande);
        },
        updateListeDemande(state, demandes){
            state.demandes = demandes;
        },
    },
    actions: {
        async addDemande({ commit }, data) {
            console.log("Ajout d'une demande UberFlippe :", data);
            let response = await UberFlippeService.addDemandeUberFlippe(data);
            console.log(response)
            if (response.error === 0) {
                commit("addDemandeUberFlippe", response.data);
            }
            console.log(response.data)
            return response;
        },
        async getAllSignalements({commit}){
            console.log("Récupération des signalements")
            let response = await UberFlippeService.getAllDemande();
            if (response.error === 0){
                commit("updateListeDemande", response.data);
            } else {
                console.log(response.data)
            }
        },
    }
})