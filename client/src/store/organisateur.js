import { getBilletsAchetesAujourdHui } from "@/services/organisateur.service";

const state = {
    billetsAchatAujourdHui: 0,
};

const mutations = {
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
};

const getters = {
    billetsAchatAujourdHui: (state) => state.billetsAchatAujourdHui,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
