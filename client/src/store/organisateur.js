import { getAllOrganisateurs, getAllPrestataires } from "@/services/organisateur.service";
import { getBilletsAchetesAujourdHui } from "@/services/organisateur.service";

const state = {
    billetsAchatAujourdHui: 0,
    organisateurs: [],
    prestataires: [],
};

const mutations = {
    SET_ORGANISATEURS(state, organisateurs) {
        state.organisateurs = organisateurs;
    },
    SET_PRESTATAIRES(state, prestataires) {
        state.prestataires = prestataires;
    },
    SET_BILLETS_AUJOURD_HUI(state, billets) {
        state.billetsAchatAujourdHui = billets.length; // si billets est un tableau
    },
};

const actions = {
    async fetchBilletsAchatAujourdhui({ commit }) {
        const response = await getBilletsAchetesAujourdHui();
        if (response.error === 0) {
            commit('SET_BILLETS_AUJOURD_HUI', response.data);
        }
    },

    async fetchOrganisateurs({ commit }) {
        const response = await getAllOrganisateurs();
        if (response.error === 0) {
            commit('SET_ORGANISATEURS', response.data);
        }
    },
    async fetchPrestataires({ commit }) {
        const response = await getAllPrestataires();
        if (response.error === 0) {
            commit('SET_PRESTATAIRES', response.data);
        } else {
            console.error("Impossible de récupérer les prestataires.");
        }
    }
};

const getters = {
    billetsAchatAujourdHui: (state) => state.billetsAchatAujourdHui,
    organisateurs: (state) => state.organisateurs,
    prestataires: (state) => state.prestataires,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
