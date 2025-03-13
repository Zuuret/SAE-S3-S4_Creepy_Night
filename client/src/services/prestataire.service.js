import LocalSource from '../datasource/controller'

async function getLivreDOrFromLocalSource(idPrestataire){
    return LocalSource.getLivreDOr(idPrestataire)
}
async function ajoutLivreDOrFromLocalSource(data){
    return LocalSource.ajoutLivreDOr(data)
}
async function getAllArticlesByIdFromLocalSource(idPrestataire){
    return LocalSource.getAllArticlesById(idPrestataire)
}
async function getArticleByIdFromLocalSource(idArticle){
    return LocalSource.getArticleById(idArticle)
}
async function getAllArticleFromLocalSource(){
    return LocalSource.getAllArticle()
}
async function ajouterAuPanierArticleFromLocalSource(article) {
    return LocalSource.ajouterAuPanierArticle(article)
}
async function incrementerQuantiteArticleFromLocalSource(item){
    return LocalSource.incrementerQuantiteArticle(item)
}
async function diminuerQuantiteArticleFromLocalSource(item){
    return LocalSource.diminuerQuantiteArticle(item)
}
async function addReservationArticleFromLocalSource(idUser) {
    return LocalSource.addReservationArticle(idUser)
}
async function getReservationArticleByIdFromLocalSource(utilisateurId){
    return LocalSource.getReservationArticleById(utilisateurId)
}
async function setPrestataireArticleFromLocalSource(data){
    return LocalSource.setPrestataireArticle(data)
}
async function delPrestataireArticleFromLocalSource(id){
    return LocalSource.delPrestataireArticle(id)
}


async function getLivreDOr(idPrestataire) {
    let response;
    try {
        response = await getLivreDOrFromLocalSource(idPrestataire)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer le livre d'or"  }
    }
    return response
}
async function ajoutLivreDOr(data) {
    let response;
    try {
        response = await ajoutLivreDOrFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un commentaire au livre d'or'"  }
    }
    return response
}
async function getAllArticlesById(idPrestataire) {
    let response;
    try {
        response = await getAllArticlesByIdFromLocalSource(idPrestataire)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer les articles"  }
    }
    return response
}
async function getArticleById(idArticle) {
    let response;
    try {
        response = await getArticleByIdFromLocalSource(idArticle)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer 'article'"  }
    }
    return response
}
async function getAllArticle() {
    let response;
    try {
        response = await getAllArticleFromLocalSource()
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer 'article'"  }
    }
    return response
}
async function ajouterAuPanierArticle(article) {
    let response;
    try {
        response = await ajouterAuPanierArticleFromLocalSource(article)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un article au panier'"  }
    }
    return response
}
async function incrementerQuantiteArticle(item){
    let response;
    try {
        response = await incrementerQuantiteArticleFromLocalSource(item)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'incrémenter l'article de ce panier'"  }
    }
    return response
}
async function diminuerQuantiteArticle(item){
    let response;
    try {
        response = await diminuerQuantiteArticleFromLocalSource(item)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de diminuer la quantité de l'article de ce panier'"  }
    }
    return response
}
async function addReservationArticle(idUser){
    let response;
    try {
        response = await addReservationArticleFromLocalSource(idUser)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter une reservation"  }
    }
    return response
}
async function getReservationArticleById(utilisateurId){
    let response;
    try {
        response = await getReservationArticleByIdFromLocalSource(utilisateurId)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer les réservations par votre Id"  }
    }
    return response
}
async function setPrestataireArticle(data){
    let response;
    try {
        response = await setPrestataireArticleFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier l'article de la société" }
    }
    return response
}

async function delPrestataireArticle(id){
    let response;
    try {
        response = await delPrestataireArticleFromLocalSource(id)
    } catch(err) {
        console.log(err)
        response = {error: 1, status: 404, data: "erreur réseau, impossible de supprimer l'article de la société" }
    }
    return response
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
}