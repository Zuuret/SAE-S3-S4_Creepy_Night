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
        taille_deguisement: null,
        panier: [],
        reservations: [],
        reservationsId: []
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
            state.taille_deguisements = taille_deguisements
        },
        updateTailleDeguisementById(state, taille_deguisement){
            state.taille_deguisement = taille_deguisement;
        },
        addDeguisement(state, deguisement){
            const existingDeguisement = state.panier.find(
                item => item.id_costume === deguisement.id_costume && item.taille === deguisement.taille
            );
            if (existingDeguisement) {
                existingDeguisement.quantite += 1;
            } else {
                state.panier.push({ ...deguisement, quantite: 1 });
            }
        },
        incrementerQuantite(state, { article, stock }) {
            let articleDansPanier = state.panier.find(panierItem => panierItem.id_costume === article.id_costume && panierItem.taille === article.taille);
            let stockDeguisement = state.taille_deguisements.find(stockItem => stockItem.id_deguisement === stock.id_deguisement && stockItem.taille === stock.taille);
            if (!articleDansPanier) {
                console.error("Article introuvable dans le panier :", article);
                return;
            }
            if (!stockDeguisement) {
                console.error("Stock introuvable :", stock);
                return;
            }
            articleDansPanier.quantite = article.quantite;
            stockDeguisement.quantite = stock.quantite;
        },
        diminuerQuantite(state, { article, stock }) {
            let articleDansPanier = state.panier.find(panierItem => panierItem.id_costume === article.id_costume && panierItem.taille === article.taille);
            let stockDeguisement = state.taille_deguisements.find(stockItem => stockItem.id_deguisement === stock.id_deguisement && stockItem.taille === stock.taille);
            if (!articleDansPanier) {
                console.error("Article introuvable dans le panier :", article);
                return;
            }
            if (!stockDeguisement) {
                console.error("Stock introuvable :", stock);
                return;
            }
            if (articleDansPanier.quantite > 1) {
                articleDansPanier.quantite = article.quantite;
                stockDeguisement.quantite = stock.quantite;
            } else if (articleDansPanier.quantite === 1) {
                state.panier = state.panier.filter(
                    panierItem => panierItem.id_costume !== article.id_costume || panierItem.taille !== article.taille
                );
                stockDeguisement.quantite = stock.quantite;
            }
        },
        locationDeguisement(state, reservation) {
            state.reservations.push(reservation);
            state.reservationsId.push(reservation.id_reservation);
            state.panier = [];
        },
        updateLocationDeguisementId(state, reservationsId){
            state.reservationsId = reservationsId
        },
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
        async getAllTailleDeguisement({commit}){
            console.log("Récupération des tailles de déguisements");
            let response = await BaltrouilleService.getAllTailleDeguisement();
            if (response.error === 0) {
                commit('updateListeTailleDeguisement', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getTailleDeguisementById({ commit }, deguisementId) {
            console.log("Récupération des tailles pour le déguisement ID : ", deguisementId);
            let response = await BaltrouilleService.getTailleDeguisementById(deguisementId);
            if (response.error === 0) {
                commit('updateTailleDeguisementById', response.data);
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
            let response = await BaltrouilleService.ajoutDeguisement(deguisement)
            if (response.error === 0){
                commit('addDeguisement', deguisement);
            } else {
                console.log(response.data)
            }
        },
        async incrementerQuantite({commit}, item){
            console.log("Incrementation de la quantite")
            let response = await BaltrouilleService.incrementerQuantiteDeguisement(item)
            if (response.error === 0){
                commit('incrementerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        },
        async diminuerQuantite({commit}, item){
            console.log("Diminution de la quantite")
            let response = await BaltrouilleService.diminuerQuantiteDeguisement(item)
            if (response.error === 0){
                commit('diminuerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        },
        async addLocationDeguisement({ commit, dispatch }, idUser) {
            console.log("Ajout d'une reservation pour ID :", idUser);
            let response = await BaltrouilleService.addLocationDeguisement(idUser)
            if (response.error === 0) {
                commit('locationDeguisement', response.data.reservation);
                dispatch('ProfilStore/updateFunds', response.data.transaction, { root: true });
                console.log(response.data.transaction)
            } else {
                console.error(response.data);
            }
        },
        async getLocationDeguisementById({commit}, utilisateurId){
            console.log("Récupération des locations de ID :", utilisateurId)
            let response = await BaltrouilleService.getLocationDeguisementById(utilisateurId)
            console.log('Response :', response)
            if (response.error === 0) {
                commit('updateLocationDeguisementId', response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})