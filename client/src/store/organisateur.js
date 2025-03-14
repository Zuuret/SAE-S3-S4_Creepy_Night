import { getAllOrganisateurs, getAllPrestataires } from "@/services/organisateur.service";
import { getBilletsAchatAujourdHui } from "@/datasource/controller";

const state = {
    billetsAchatAujourdHui: 0,
    organisateurs: [],
    prestataires: [],
};

const mutations = {
    SET_BILLET_AUJOURDHUI(state, count) {
        state.billetsAchatAujourdHui = count;
    },
    SET_ORGANISATEURS(state, organisateurs) {
        state.organisateurs = organisateurs;
    },
    SET_PRESTATAIRES(state, prestataires) {
        state.prestataires = prestataires;
    },
};

const actions = {
    async fetchBilletsAchatAujourdHui({ commit }) {
        const response = await getBilletsAchatAujourdHui();
        console.log("Billets achetés aujourd'hui :", response.data);
        commit('SET_BILLET_AUJOURDHUI', response.data);
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
