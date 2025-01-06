import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CashLessService from '../services/cashless.service';

export default ({
    namespaced: true,
    state: {
        transactions: [],
    },
    mutations: {
        updateAllTransactions(state, transactions){
            state.transactions = transactions;
        }
    },
    actions: {
        async getAllTransactions({ commit }) {
            console.log("Récupération des transactions");
            let response = await CashLessService.getAllTransactions();
            if (response.error === 0) {
                commit('updateAllTransactions', response.data);
            } else {
                console.log(response.data);
            }
        }
    }
})