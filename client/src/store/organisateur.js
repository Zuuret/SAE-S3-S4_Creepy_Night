import { getBilletsAchetesAujourdHui, getBilletsAchetesCetteSemaine } from "@/services/organisateur.service";

const state = {
    billetsAchatAujourdHui: 0,
    historiqueVentes: [] // Ajout pour stocker les données historiques
};

const mutations = {
    SET_BILLETS_AUJOURD_HUI(state, billets) {
        state.billetsAchatAujourdHui = billets.length;
    },
    SET_HISTORIQUE_VENTES(state, historique) {
        state.historiqueVentes = historique;
    }
};

const actions = {
    async fetchBilletsAchatAujourdhui({ commit }) {
        const response = await getBilletsAchetesAujourdHui();
        if (response.error === 0) {
            commit('SET_BILLETS_AUJOURD_HUI', response.data);
        }
    },
    async fetchHistoriqueVentes({ commit }) {
        const response = await getBilletsAchetesCetteSemaine();
        if (response.error === 0) {
            commit('SET_HISTORIQUE_VENTES', response.data);
        }
    }
};

const getters = {
    billetsAchatAujourdHui: (state) => state.billetsAchatAujourdHui,
    historiqueVentes: (state) => state.historiqueVentes
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};