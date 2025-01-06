import Vue from 'vue';
import Vuex from 'vuex';
import PrestaireService from '../services/prestataire.service'

Vue.use(Vuex);

export default ({
    namespaced: true,
    state: {
        livreDOr: [],
        commentaire: null,
        articles: [],
        article: null
    },
    mutations: {
        updateLivreDOr(state, livreDOr) {
            state.livreDOr = livreDOr
        },
        ajoutLivreDOr(state, commentaire) {
            state.livreDOr.push(commentaire)
        },
        updateListeArticles(state, articles){
            state.articles = articles
        },
        updateArticleById(state, article){
            state.article = article
        },
        addArticle(state, article){
            const articleExistant = state.panier.find(
                item => item === article.id
            );
            if (articleExistant) {
                article.stock -= 1;
                articleExistant.quantite += 1;
            } else {
                article.stock -= 1;
                state.panier.push({ ...article, quantite: 1 });
            }
        },
    },
    actions: {
        async getLivreDOr({commit}, idPrestataire) {
            console.log("Récupération du livre d'or ID :", idPrestataire)
            let response = await PrestaireService.getLivreDOr(idPrestataire)
            if (response.error === 0) {
                commit('updateLivreDOr', response.data)
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
                commit('updateListeArticles', response.data)
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
    }
})
