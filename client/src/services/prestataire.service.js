import { getRequest, postRequest, putRequest, deleteRequest } from "@/services/axios.service";


async function getLivreDOrFromAPI(idPrestataire) {
    return await getRequest(`livreDOr/${idPrestataire}`);
}

async function getLivreDOr(idPrestataire) {
    let response;
    try {
        response = await getLivreDOrFromAPI(idPrestataire);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer le livre d'or" };
    }
    return response;
}

async function ajoutLivreDOrFromAPI(data) {
    return await postRequest(`livreDOr/${data.prestataire_id}`, data);
}

async function ajoutLivreDOr(data) {
    let response;
    try {
        response = await ajoutLivreDOrFromAPI(data);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter un commentaire au livre d'or" };
    }
    return response;
}


async function getAllArticlesByIdFromAPI(idPrestataire) {
    return await getRequest(`articles/prestataire/${idPrestataire}`);
}

async function getAllArticlesById(idPrestataire) {
    let response;
    try {
        response = await getAllArticlesByIdFromAPI(idPrestataire);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les articles" };
    }
    return response;
}

async function getArticleByIdFromAPI(idArticle) {
    return await getRequest(`articles/prestataire/article/${idArticle}`);
}

async function getArticleById(idArticle) {
    let response;
    try {
        response = await getArticleByIdFromAPI(idArticle);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer l'article" };
    }
    return response;
}

async function getAllArticlesFromAPI() {
    return await getRequest(`articles/prestataire`);
}

async function getAllArticles() {
    let response;
    try {
        response = await getAllArticlesFromAPI();
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les articles" };
    }
    return response;
}


async function ajouterAuPanierArticleFromAPI(article, utilisateur_id) {
    const data = { article, utilisateur_id };
    return await postRequest(`articles/cart`, data);
}

async function ajouterAuPanierArticle(article) {
    let response;
    try {
        const utilisateur_id = article.utilisateur_id;
        response = await ajouterAuPanierArticleFromAPI(article, utilisateur_id);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter un article au panier" };
    }
    return response;
}

async function getReservationArticleByIdFromAPI(utilisateurId){
    return await getRequest(`articles/reservation/${utilisateurId}`);
}

async function getReservationArticleById(utilisateurId){
    let response;
    try {
        response = await getReservationArticleByIdFromAPI(utilisateurId);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les réservations" };
    }
    return response;
}

async function putPrestataireArticleFromAPI(data){
    return await putRequest(`articles/prestataire`, data, 'PRESTAMODIFARTICLE');
}

async function putPrestataireArticle(data){
    let response;
    try {
        response = await putPrestataireArticleFromAPI(data);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de modifier l'article du prestataire" };
    }
    return response;
}

async function setPrestataireArticleFromAPI(data){
    return await postRequest(`articles/prestataire`, data, 'PRESTACREATEARTICLE');
}

async function setPrestataireArticle(data){
    let response;
    try {
        response = await setPrestataireArticleFromAPI(data);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de créer l'article du prestataire" };
    }
    return response;
}

async function delPrestataireArticleFromAPI(data){
    return await deleteRequest(`articles/prestataire`, data);
}

async function delPrestataireArticle(data){
    let response;
    try {
        response = await delPrestataireArticleFromAPI(data);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de supprimer l'article du prestataire" };
    }
    return response;
}

async function getPanierFromAPI(utilisateurId){
    return await getRequest(`articles/cart/${utilisateurId}`);
}

async function getPanier(utilisateurId){
    let response;
    try {
        response = await getPanierFromAPI(utilisateurId);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer le panier" };
    }
    return response;
}

async function incrementerQuantiteArticleFromAPI(cart_item_id) {
    return await putRequest(`articles/cart/increment`, { cart_item_id });
}

async function incrementerQuantiteArticle(item) {
    let response;
    try {
        response = await incrementerQuantiteArticleFromAPI(item.panier_id);
    } catch (err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'incrémenter la quantité" };
    }
    return response;
}

async function diminuerQuantiteArticleFromAPI(cart_item_id) {
    return await putRequest(`articles/cart/decrement`, { cart_item_id });
}

async function diminuerQuantiteArticle(item) {
    let response;
    try {
        response = await diminuerQuantiteArticleFromAPI(item.panier_id);
    } catch (err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'incrémenter la quantité" };
    }
    return response;
}

async function addReservationArticleFromAPI(idUser) {
    return await postRequest(`reservationsArticles/save`, { idUser });
}

async function addReservationArticle(idUser) {
    let response;
    try {
        response = await addReservationArticleFromAPI(idUser);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter une réservation" };
    }
    return response;
}

export default {
    getLivreDOr,
    ajoutLivreDOr,
    getAllArticlesById,
    getArticleById,
    getAllArticles,
    ajouterAuPanierArticle,
    incrementerQuantiteArticle,
    diminuerQuantiteArticle,
    addReservationArticle,
    getReservationArticleById,
    putPrestataireArticle,
    setPrestataireArticle,
    delPrestataireArticle,
    getPanier
};
