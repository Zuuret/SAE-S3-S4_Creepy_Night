import { getEmplacement, updateEmplacement } from "@/services/carte.service";
import { getIcone } from "@/services/carte.service";

const state = {
    emplacement: [],
    icones: [],
};

const mutations = {
    SET_EMPLACEMENT(state, data) {
        state.emplacement = data
    },

    SET_ICONES(state, data) {
        if (Array.isArray(data)) {
            state.icones = data;
        } else {
            state.icones = [data];
        }
    }
};

const actions = {
    async fetchEmplacement({ commit }) {
        const response = await getEmplacement();
        if (response.error === 0) {
            commit('SET_EMPLACEMENT', response.data);
        }
    },

    async fetchIcone({ commit }) {
        const response = await getIcone();
        if (response.error === 0) {
            commit('SET_ICONES', response.data);
        }
    },

    async saveEmplacement({ commit }, { nom, coord_x, coord_y, prestataire_id, icone_id }) {
        const response = await updateEmplacement(nom, coord_x, coord_y, prestataire_id, icone_id);
        if (response.error === 0) {
            commit('SET_EMPLACEMENT', response.data);
        }
        return response;
    },
};

const getters = {
    emplacement: (state) => state.emplacement,
    icones: (state) => state.icones,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};