import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CashLessService from '../services/cashless.service';

export default ({
    namespaced: true,
    state: {
        transactions: [],
        transactionsUser : []
    },
    mutations: {
        updateAllTransactions(state, transactions){
            state.transactions = transactions;
        },
        updateTransactionsUser(state, transactions) {
            state.transactionsUser = transactions;
        }
    },
    actions: {
        async getAllTransactions({ commit }) {
            let response = await CashLessService.getAllTransactions();
            if (response.error === 0) {
                commit('updateAllTransactions', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getUserTransactions({ commit }, utilisateurId) {
            let response = await CashLessService.getUserTransactions(utilisateurId);
            if (response && response.data) {
                commit('updateTransactionsUser', response.data);
            } else {
                console.error("Erreur lors de la récupération des transactions:", response);
            }
        }
    }
})