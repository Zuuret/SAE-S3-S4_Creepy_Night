import Vue from 'vue';
import Vuex from 'vuex';
import PrestataireService from '../services/prestataire.service'

Vue.use(Vuex);

export default ({
    namespaced: true,
    state: {
        livreDOr: [],
        articles: [],
        articlesId: [],
        article: null,
        panier: [],
        reservations: [],
        reservationsId: [],
    },
    mutations: {
        updateLivreDOr(state, livreDOr) {
            state.livreDOr = livreDOr
        },
        ajoutLivreDOr(state, commentaire) {
            state.livreDOr.unshift(commentaire)
        },
        updateListeArticlesId(state, articlesId){
            state.articlesId = articlesId
        },
        updateArticleById(state, article){
            state.article = article
        },
        updateListeArticle(state, articles){
            state.articles = articles
        },
        addArticle(state, article){
            const existingArticle = state.panier.find(item => item.id === article.id);
            if (existingArticle) {
                existingArticle.quantite += 1;
            } else {
                state.panier.push({ ...article, quantite: 1 });
            }
        },
        incrementerQuantite(state, { article, stock }) {
            let articleDansPanier = state.panier.find(panierItem => panierItem.id === article.id);
            let stockArticle = state.articles.find(stockItem => stockItem.id === stock.id);
            if (!articleDansPanier) {
                console.error("Article introuvable dans le panier :", article);
                return;
            }
            if (!stockArticle) {
                console.error("Stock introuvable :", stock);
                return;
            }
            articleDansPanier.quantite = article.quantite;
            stockArticle.stock = stock.stock;
        },
        diminuerQuantite(state, { article, stock }) {
            let articleDansPanier = state.panier.find(panierItem => panierItem.id === article.id);
            let stockArticle = state.articles.find(stockItem => stockItem.id === stock.id);
            if (!articleDansPanier) {
                console.error("Article introuvable dans le panier :", article);
                return;
            }
            if (!stockArticle) {
                console.error("Stock introuvable :", stock);
                return;
            }
            if (articleDansPanier.quantite > 1) {
                articleDansPanier.quantite = article.quantite;
                stockArticle.stock = stock.stock;
            } else if (articleDansPanier.quantite === 1) {
                state.panier = state.panier.filter(panierItem => panierItem.id !== article.id);
                stockArticle.stock = stock.stock;
            }
        },
        reservationArticle(state, reservation) {
            state.reservations.push(reservation);
            state.reservationsId.push(reservation.id_reservationArticle);
            state.panier = [];
        },
        updateReservationArticleId(state, reservationsId){
            state.reservationsId = reservationsId
        },
    },
    actions: {
        async getLivreDOr({commit}, idPrestataire) {
            console.log("Récupération du livre d'or ID :", idPrestataire)
            let response = await PrestataireService.getLivreDOr(idPrestataire)
            if (response.error === 0) {
                commit('updateLivreDOr', response.data)
                console.log(response.data)
            } else {
                console.log(response.data);
            }
        },
        async ajoutCommentaire({commit}, data) {
            console.log("Enregistrement d'un nouveau commentaire");
            let response = await PrestataireService.ajoutLivreDOr(data);
            console.log(response)
            if (response.error === 0) {
                commit('ajoutLivreDOr', response.data);
            } else {
                console.log(response.data)
            }
        },
        async getAllArticlesById({commit}, idPrestataire) {
            console.log("Récupération des articles pour le prestataire ID :", idPrestataire)
            let response = await PrestataireService.getAllArticlesById(idPrestataire)
            if (response.error === 0) {
                commit('updateListeArticlesId', response.data)
            } else {
                console.log(response.data);
            }
        },
        async getArticleById({commit}, idArticle) {
            console.log("Récupération de l'article ID :", idArticle)
            let response = await PrestataireService.getArticleById(idArticle)
            if (response.error === 0) {
                commit('updateArticleById', response.data)
            } else {
                console.log(response.data);
            }
        },
        async getAllArticles({commit}){
            console.log("Récupération de tout les articles :")
            let response = await PrestataireService.getAllArticles()
            if (response.error === 0) {
                commit('updateListeArticle', response.data)
            } else {
                console.log(response.data);
            }
        },
        async addArticlePanier({commit}, article) {
            console.log("Ajout d'un article")
            let response = await PrestataireService.ajouterAuPanierArticle(article)
            if (response.error === 0){
                commit('addArticle', response.data);
            } else {
                console.log(response.data)
            }
        },
        async incrementerQuantite({commit}, item) {
            console.log("Incrementation de la quantite")
            let response = await PrestataireService.incrementerQuantiteArticle(item)
            if (response.error === 0) {
                commit('incrementerQuantite', response.data)
                console.log(response.data)
            } else {
                console.log(response.data)
            }
        },
        async diminuerQuantite({commit}, article){
            console.log("Diminution de la quantite")
            let response = await PrestataireService.diminuerQuantiteArticle(article)
            if (response.error === 0){
                commit('diminuerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        },
        async reserverArticle({ commit }, idUser) {
            console.log("Ajout d'une reservation pour ID :", idUser);
            let response = await PrestataireService.addReservationArticle(idUser)
            if (response.error === 0) {
                commit('reservationArticle', response.data.newResAr);
                commit('ProfilStore/updateSoldeUtilisateur', response.data.solde, { root: true });
            } else {
                console.error(response.data);
            }
        },
        async getReservationArticleById({commit}, utilisateurId){
            console.log("Récupération des articles d'ID :", utilisateurId)
            let response = await PrestataireService.getReservationArticleById(utilisateurId)
            if (response.error === 0) {
                commit('updateReservationArticleId', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setPrestataireArticle({commit}, data){
            console.log("Création de l'article")
            let response = await PrestataireService.setPrestataireArticle(data)
            if (response.error === 0) {
                commit('updateArticleById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async putPrestataireArticle({commit}, data){
            console.log("Modification de l'article d'ID :", data.id)
            let response = await PrestataireService.putPrestataireArticle(data)
            if (response.error === 0) {
                commit('updateArticleById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async delPrestataireArticle({commit}, articleId){
            console.log("Destruction de l'article d'ID :", articleId)
            let response = await PrestataireService.delPrestataireArticle(articleId)
            if (response.error === 0) {
                commit('updateArticleById', response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})
