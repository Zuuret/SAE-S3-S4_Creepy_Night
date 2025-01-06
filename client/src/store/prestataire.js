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
        articlesId: [],
        article: null,
        panier: [],
    },
    mutations: {
        updateLivreDOr(state, livreDOr) {
            state.livreDOr = livreDOr
        },
        ajoutLivreDOr(state, commentaire) {
            state.livreDOr.push(commentaire)
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
        addArticle(state, article) {
            let articleGlobal = state.articles.find(art => art.id === article.id);
            const articleExistant = state.panier.find(item => item.id === article.id);
            if (articleGlobal.stock > 0) {
                if (articleExistant) {
                    articleExistant.quantite += 1;
                    articleGlobal.stock -= 1;
                } else {
                    state.panier.push({...article, quantite: 1});
                    articleGlobal.stock -= 1;
                }
            }
        },
        incrementerQuantite(state, item) {
            let articleGlobal = state.articles.find(art => art.id === item.id);
            if (articleGlobal && articleGlobal.stock > 0) {
                item.quantite += 1;
                articleGlobal.stock -= 1;
            } else {
                alert("Stock insuffisant pour ajouter cet article.");
            }
        },
        diminuerQuantite(state, item) {
            let articleGlobal = state.articles.find(art => art.id === item.id);
            if (item.quantite > 1) {
                item.quantite -= 1;
                articleGlobal.stock += 1;
            } else {
                const index = state.panier.findIndex(panierItem => panierItem.id === item.id);
                if (index !== -1) {
                    state.panier.splice(index, 1);
                    articleGlobal.stock += 1;
                }
            }
        }
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
            commit('addArticle', article);
        },
        async incrementerQuantite({commit}, article){
            console.log("Incrementation de la quantite")
            commit('incrementerQuantite', article)
        },
        async diminuerQuantite({commit}, article){
            console.log("Diminution de la quantite")
            commit('diminuerQuantite', article)
        }
    }
})
