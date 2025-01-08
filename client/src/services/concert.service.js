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

async function getAllPlaceConcertFromLocalSource(){
    return LocalSource.getAllPlaceConcert();
}

async function getAllPlaceConcert() {
    let response;
    try {
        response = await getAllPlaceConcertFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des concerts' };
    }
    return response;
}

async function getPlacesConcertsbyIdFromLocalSource(placeId) {
    return LocalSource.getPlaceConcertbyId(placeId);
}

async function getPlacesConcertsbyId(placeId) {
    let response;
    try {
        response = await getPlacesConcertsbyIdFromLocalSource(placeId);
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
        response = await ajouterAuPanierFromLocalSource(concertId, nbPlaces)
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter un concert au panier' };
    }
    return response;
}

async function addReservationConcertFromLocalSource(idUser){
    return LocalSource.addReservationConcert(idUser)
}

async function addReservationConcert(idUser) {
    let response;
    try {
        response = addReservationConcertFromLocalSource(idUser)
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter une réservation' };
    }
    return response;
}

async function getReservationConcertByIdFromLocalSource(utilisateurId){
    return LocalSource.getReservationConcertById(utilisateurId)
}

async function getReservationConcertById(utilisateurId) {
    let response;
    try {
        response = await getReservationConcertByIdFromLocalSource(utilisateurId)
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de procéder à l\'achat de vos ticket concert' };
    }
    return response;
}

export default {
    getAllConcerts,
    getConcertbyId,
    getAllPlaceConcert,
    getPlacesConcertsbyId,
    ajouterAuPanier,
    addReservationConcert,
    getReservationConcertById
};