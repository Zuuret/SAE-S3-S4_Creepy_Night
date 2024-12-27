import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CashLessService from '../services/cashless.service';

export default ({
    namespaced: true,
    state: {
        utilisateur: {"id":1, "prenom":"John", "nom":"Doe", "dateNaissance":"23-09-1998", "email":"johndoe@gmail.com", "motDePasse":"mdp123", "solde": 100, "numCashless": 123456789},
        transactions: [],
    },
    mutations: {
        updateAllTransactions(state, transactions){
            state.transactions = transactions;
        },
        updateUtilisateur(state, utilisateur) {
            state.utilisateur = utilisateur;
        },
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
        },
        async updateFunds({commit}, data){
            console.log("Mise à jour du solde de l'utilisateur")
            let response = await CashLessService.updateFunds(data);
            if(response.error === 0){
                commit('updateUtilisateur', response.data);
                return true;
            } else {
                console.log(response.data);
                return false;
            }
        },
    }
})