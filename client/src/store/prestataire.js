import Vue from 'vue';
import Vuex from 'vuex';
import PrestaireService from '../services/prestataire.service'

Vue.use(Vuex);

export default ({
    namespaced: true,
    state: {
        livreDOr: [],
        commentaire: null
    },
    mutations: {
        updateLivreDOr(state, livreDOr) {
            state.livreDOr = livreDOr
        },
        ajoutLivreDOr(state, commentaire) {
            state.livreDOr.push(commentaire)
        }
    },
    actions: {
        async getLivreDOr({commit}, idPrestataire) {
            console.log("Récupération du livre d'or ID :", idPrestataire)
            let response = await PrestaireService.getLivreDOr(idPrestataire)
            if (response.error === 0) {
                commit('updateLivreDOr', response.data)
            } else {
                console.log(response.data);
            }
        },
        async ajoutCommentaire({commit}, data) {
            console.log("Enregistrement d'un nouveau commentaire");
            let response = await PrestaireService.ajoutLivreDOr(data);
            console.log(response)
            if (response.error === 0) {
                commit('ajoutLivreDOr', response.data);
            } else {
                console.log(response.data)
            }
        },
    }
})
