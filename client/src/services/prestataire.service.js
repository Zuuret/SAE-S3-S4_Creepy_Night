import LocalSource from '../datasource/controller'

async function getLivreDOrFromLocalSource(idPrestataire){
    return LocalSource.getLivreDOr(idPrestataire)
}
async function ajoutLivreDOrFromLocalSource(data){
    return LocalSource.ajoutLivreDOr(data)
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

export default {
    getLivreDOr,
    ajoutLivreDOr
}