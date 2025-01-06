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

export default {
    getLivreDOr,
    ajoutLivreDOr,
    getAllArticlesById,
    getArticleById
}