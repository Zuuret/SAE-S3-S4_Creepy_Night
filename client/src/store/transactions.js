import { getBilletsAchatAujourdHui, addTransactionToDatabase } from '../services/transactions.service';

export default {
  namespaced: true,
  state: {
    billetsAchatAujourdHui: 0,
  },
  mutations: {
    setBilletsAchatAujourdHui(state, count) {
      state.billetsAchatAujourdHui = count;
    },
  },
  actions: {
    async fetchBilletsAchatAujourdHui({ commit }) {
      const response = await getBilletsAchatAujourdHui();
      if (response.error === 0) {
        commit('setBilletsAchatAujourdHui', response.data);
      } else {
        console.error(response.data);
      }
    },
    async addTransaction({ dispatch }, paymentDetails) {
      await addTransactionToDatabase(paymentDetails);
      await dispatch('fetchBilletsAchatAujourdHui');
    },
  },
  getters: {
    billetsAchatAujourdHui: (state) => state.billetsAchatAujourdHui,
  },
};
