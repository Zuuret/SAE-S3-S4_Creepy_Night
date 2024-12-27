import LocalSource from "@/datasource/controller";

async function getAllConcertsFromLocalSource(){
    return LocalSource.getAllConcerts();
}

async function getAllConcerts() {
    let response;
    try {
        response = await getAllConcertsFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des concerts' };
    }
    return response;
}

async function getConcertbyIdFromLocalSource(concertId) {
    return LocalSource.getConcertbyId(concertId);
}

async function getConcertbyId(concertId) {
    let response;
    try {
        response = await getConcertbyIdFromLocalSource(concertId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des concerts' };
    }
    return response;
}

async function getPlacesConcertsFromLocalSource(concertId) {
    return LocalSource.getPlaceConcert(concertId);
}

async function getPlacesConcerts(concertId) {
    let response;
    try {
        response = await getPlacesConcertsFromLocalSource(concertId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des places de concerts' };
    }
    return response;
}

async function getPanierFromLocalSource(){
    return LocalSource.getPanier();
}

async function getPanier(){
    let response;
    try {
        response = await getPanierFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des places de concerts' };
    }
    return response;
}

async function addAuPanierFromLocalSource(concertId, placeType, quantite){
    return LocalSource.addAuPanier(concertId, placeType, quantite)
}

async function addAuPanier(concertId, placeType, quantite) {
    let response;
    try {
        response = await addAuPanierFromLocalSource(concertId, placeType, quantite);
    } catch (err) {
        response = { error: 1, data: 'Erreur lors de l’ajout au panier.' };
    }
    return response;
}

export default {
    getAllConcerts,
    getConcertbyId,
    getPlacesConcerts,
    getPanier,
    addAuPanier
};

/* eslint-disable */