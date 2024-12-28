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

async function ajouterAuPanierFromLocalSource(concertId, nbPlaces){
    return LocalSource.ajouterAuPanier(concertId, nbPlaces)
}

async function ajouterAuPanier(concertId, nbPlaces) {
    let response;
    try {
        response = await ajouterAuPanierFromLocalSource(concertId, nbPlaces);
    } catch (err) {
        response = { error: 1, data: 'Erreur lors de l’ajout au panier.' };
    }
    return response;
}

async function retirerDuPanierFromLocalSource(concertId, nbPlaces){
    return LocalSource.retirerDuPanier(concertId, nbPlaces)
}

async function retirerDuPanier(concertId, nbPlaces) {
    let response;
    try {
        response = await retirerDuPanierFromLocalSource(concertId, nbPlaces);
    } catch (err) {
        response = { error: 1, data: 'Erreur lors de la supression au panier.' };
    }
    return response;
}

async function calculerTotalFromLocalSource(){
    return LocalSource.calculerTotal();
}

async function calculerTotal() {
    let response;
    try {
        response = await calculerTotalFromLocalSource();
    } catch (err) {
        response = { error: 1, data: 'Erreur lors du calcul du total' };
    }
    return response;
}

export default {
    getAllConcerts,
    getConcertbyId,
    getPlacesConcerts,
    ajouterAuPanier,
    retirerDuPanier,
    calculerTotal
};