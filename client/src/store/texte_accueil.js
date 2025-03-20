import { getTexteAccueil, updateTexteAccueil } from "@/services/texte_accueil.service";

const state = {
    titre: '',
    contenu: '',
};

const mutations = {
    SET_TEXTE_ACCUEIL(state, data) {
        state.titre = data.titre;
        state.contenu = data.contenu;
    },
};

const actions = {
    async fetchTexteAccueil({ commit }) {
        const response = await getTexteAccueil();
        if (response.error === 0) {
            commit('SET_TEXTE_ACCUEIL', response.data);
        }
    },

    async saveTexteAccueil({ commit }, { titre, contenu }) {
        const response = await updateTexteAccueil(titre, contenu);
        if (response.error === 0) {
            commit('SET_TEXTE_ACCUEIL', response.data);
        }
        return response;
    },
};

const getters = {
    titreAccueil: (state) => state.titre,
    contenuAccueil: (state) => state.contenu,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};