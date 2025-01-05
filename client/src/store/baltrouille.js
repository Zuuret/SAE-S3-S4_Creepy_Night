import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import BaltrouilleService from "../services/baltrouille.service";

export default ({
    namespaced: true,
    state: {
        soirees: [],
        soiree: null,
        deguisements: [],
        deguisement: null,
        taille_deguisements: [],
        panier: [],
    },
    mutations: {
        updateListeSoiree(state, soirees){
            state.soirees = soirees
        },
        updateSoireeById(state, soiree){
            state.soiree = soiree
        },
        updateListeDeguisement(state, deguisements){
            state.deguisements = deguisements
        },
        updateDeguisementById(state, deguisement){
            state.deguisement = deguisement
        },
        updateListeTailleDeguisement(state, taille_deguisements){
            state.taille_deguisements = taille_deguisements;
        },
        addDeguisement(state, deguisement){
            const existingDeguisement = state.panier.find(
                item => item.id_costume === deguisement.id_costume && item.taille === deguisement.taille
            );
            if (existingDeguisement) {
                existingDeguisement.quantite += 1;
            } else {
                state.panier.push({ ...deguisement, quantite: deguisement.quantite || 1 });
            }
        },
        incrementerQuantite(state, item) {
            let article = state.panier.find(
                panierItem => panierItem.id_costume === item.id_costume && panierItem.taille === item.taille
            );
            let stock = state.taille_deguisements.find(
                stockItem => stockItem.id_deguisement === item.id_costume && stockItem.taille === item.taille
            );
            if (article && stock && article.quantite < stock.quantite || article.quantite == stock.quantite) {
                article.quantite += 1;
            } else {
                alert("Stock insuffisant pour ajouter cet article.");
            }
        },
        diminuerQuantite(state, item) {
            let article = state.panier.find(
                panierItem => panierItem.id_costume === item.id_costume && panierItem.taille === item.taille
            );
            let stock = state.taille_deguisements.find(
                stockItem => stockItem.id_deguisement === item.id_costume && stockItem.taille === item.taille
            );
            if (article) {
                if (article.quantite > 1) {
                    article.quantite -= 1;
                    stock.quantite += 1;
                } else if (article.quantite === 1) {
                    const index = state.panier.findIndex(
                        panierItem => panierItem.id_costume === item.id_costume && panierItem.taille === item.taille
                    );
                    if (index !== -1) {
                        state.panier.splice(index, 1);
                    }
                }
            }
        }
    },
    actions: {
        async getAllSoireeBaltrouille({commit}){
            console.log("Récupération des soirees");
            let response = await BaltrouilleService.getAllSoireeBaltrouille();
            if (response.error === 0) {
                commit('updateListeSoiree', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getSoireeBaltrouilleById({commit}, soireeId){
            console.log("Récupération de la soirée ID : ",soireeId);
            let response = await BaltrouilleService.getSoireeBaltrouilleById(soireeId);
            if (response.error === 0) {
                commit('updateSoireeById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getAllDeguisement({commit}){
            console.log("Récupération des déguisements");
            let response = await BaltrouilleService.getAllDeguisement();
            if (response.error === 0) {
                commit('updateListeDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getDeguisementById({commit}, deguisementId){
            console.log("Récupération du déguisement ID : ",deguisementId);
            let response = await BaltrouilleService.getDeguisementById(deguisementId);
            if (response.error === 0) {
                commit('updateDeguisementById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getTailleDeguisement({ commit }, deguisementId) {
            console.log("Récupération des tailles pour le déguisement ID : ", deguisementId);
            let response = await BaltrouilleService.getTailleDeguisement(deguisementId);
            if (response.error === 0) {
                commit('updateListeTailleDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getDeguisementBySoiree({ commit }, soireeId) {
            console.log("Récupération des déguisements pour la soirée : ", soireeId);
            let response = await BaltrouilleService.getDeguisementBySoiree(soireeId);
            if (response.error === 0) {
                commit('updateListeDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async addDeguisementPanier({commit}, deguisement) {
            console.log("Ajout d'un déguisement au panier")
            let response = await BaltrouilleService.addDeguisementPanier(deguisement)
            if (response.error === 0) {
                commit('addDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async incrementerQuantite({commit}, deguisement){
            console.log("Incrementation de la quantite")
            let response = await BaltrouilleService.incrementerQuantite(deguisement)
            if (response.error === 0){
                commit('incrementerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        },
        async diminuerQuantite({commit}, deguisement){
            console.log("Diminution de la quantite")
            let response = await BaltrouilleService.diminuerQuantite(deguisement)
            if (response.error === 0){
                commit('diminuerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        }
    }
})