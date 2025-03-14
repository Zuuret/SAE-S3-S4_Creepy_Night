import Vue from 'vue';
import Vuex from 'vuex';
import PrestaireService from '../services/prestataire.service'

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
            console.log(state.livreDOr)
        },
        ajoutLivreDOr(state, commentaire) {
            state.livreDOr.unshift(commentaire)
            console.log(state.livreDOr)
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
            let response = await PrestaireService.getLivreDOr(idPrestataire)
            if (response.error === 0) {
                commit('updateLivreDOr', response.data)
                console.log(response.data)
            } else {
                console.log(response.data);
            }
        },
        async ajoutCommentaire({commit}, data) {
            console.log("Enregistrement d'un nouveau commentaire");
            let response = await PrestaireService.ajoutLivreDOr(data);
            console.log(response)
            if (response.error === 0) {
                commit('ajoutLivreDOr', response.data);
            } else {
                console.log(response.data)
            }
        },
        async getAllArticlesById({commit}, idPrestataire) {
            console.log("Récupération des articles pour le prestataire ID :", idPrestataire)
            let response = await PrestaireService.getAllArticlesById(idPrestataire)
            if (response.error === 0) {
                commit('updateListeArticlesId', response.data)
            } else {
                console.log(response.data);
            }
        },
        async getArticleById({commit}, idArticle) {
            console.log("Récupération de l'article ID :", idArticle)
            let response = await PrestaireService.getArticleById(idArticle)
            if (response.error === 0) {
                commit('updateArticleById', response.data)
            } else {
                console.log(response.data);
            }
        },
        async getAllArticle({commit}){
            console.log("Récupération de tout les articles :")
            let response = await PrestaireService.getAllArticle()
            if (response.error === 0) {
                commit('updateListeArticle', response.data)
            } else {
                console.log(response.data);
            }
        },
        async addArticlePanier({commit}, article) {
            console.log("Ajout d'un article")
            let response = await PrestaireService.ajouterAuPanierArticle(article)
            if (response.error === 0){
                commit('addArticle', response.data);
            } else {
                console.log(response.data)
            }
        },
        async incrementerQuantite({commit}, item) {
            console.log("Incrementation de la quantite")
            let response = await PrestaireService.incrementerQuantiteArticle(item)
            if (response.error === 0) {
                commit('incrementerQuantite', response.data)
                console.log(response.data)
            } else {
                console.log(response.data)
            }
        },
        async diminuerQuantite({commit}, article){
            console.log("Diminution de la quantite")
            let response = await PrestaireService.diminuerQuantiteArticle(article)
            if (response.error === 0){
                commit('diminuerQuantite', response.data)
            } else {
                console.log(response.data)
            }
        },
        async reserverArticle({ commit }, idUser) {
            console.log("Ajout d'une reservation pour ID :", idUser);
            let response = await PrestaireService.addReservationArticle(idUser)
            if (response.error === 0) {
                commit('reservationArticle', response.data.newResAr);
                commit('ProfilStore/updateSoldeUtilisateur', response.data.solde, { root: true });
            } else {
                console.error(response.data);
            }
        },
        async getReservationArticleById({commit}, utilisateurId){
            console.log("Récupération des articles d'ID :", utilisateurId)
            let response = await PrestaireService.getReservationArticleById(utilisateurId)
            if (response.error === 0) {
                commit('updateReservationArticleId', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setPrestataireArticle({commit}, data){
            console.log("Récupération de l'article d'ID :", data)
            let response = await PrestaireService.setPrestataireArticle(data)
            if (response.error === 0) {
                commit('updateArticleById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async delPrestataireArticle({commit}, articleId){
            console.log("Récupération de l'article d'ID :", articleId)
            let response = await PrestaireService.delPrestataireArticle(articleId)
            if (response.error === 0) {
                commit('updateArticleById', response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})
