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
    return await getRequest(`articles/${idArticle}`);
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

async function getAllArticleFromAPI() {
    return await getRequest(`articles`);
}

async function getAllArticle() {
    let response;
    try {
        response = await getAllArticleFromAPI();
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de récupérer les articles" };
    }
    return response;
}


async function ajouterAuPanierArticleFromAPI(article) {
    return await postRequest(`articles/cart`, article);
}

async function ajouterAuPanierArticle(article) {
    let response;
    try {
        response = await ajouterAuPanierArticleFromAPI(article);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter un article au panier" };
    }
    return response;
}

async function incrementerQuantiteArticleFromAPI(item){
    return await putRequest(`articles/cart/increment`, item);
}

async function incrementerQuantiteArticle(item){
    let response;
    try {
        response = await incrementerQuantiteArticleFromAPI(item);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'incrémenter l'article du panier" };
    }
    return response;
}

async function diminuerQuantiteArticleFromAPI(item){
    return await putRequest(`articles/cart/decrement`, item);
}

async function diminuerQuantiteArticle(item){
    let response;
    try {
        response = await diminuerQuantiteArticleFromAPI(item);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de diminuer la quantité de l'article du panier" };
    }
    return response;
}


async function addReservationArticleFromAPI(idUser){
    return await postRequest(`articles/reservation`, { idUser });
}

async function addReservationArticle(idUser){
    let response;
    try {
        response = await addReservationArticleFromAPI(idUser);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter une réservation" };
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


async function setPrestataireArticleFromAPI(data){
    return await putRequest(`articles/prestataire`, data);
}

async function setPrestataireArticle(data){
    let response;
    try {
        response = await setPrestataireArticleFromAPI(data);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de modifier l'article du prestataire" };
    }
    return response;
}

async function delPrestataireArticleFromAPI(id){
    return await deleteRequest(`articles/prestataire/${id}`);
}

async function delPrestataireArticle(id){
    let response;
    try {
        response = await delPrestataireArticleFromAPI(id);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible de supprimer l'article du prestataire" };
    }
    return response;
}

export default {
    getLivreDOr,
    ajoutLivreDOr,
    getAllArticlesById,
    getArticleById,
    getAllArticle,
    ajouterAuPanierArticle,
    incrementerQuantiteArticle,
    diminuerQuantiteArticle,
    addReservationArticle,
    getReservationArticleById,
    setPrestataireArticle,
    delPrestataireArticle,
};
