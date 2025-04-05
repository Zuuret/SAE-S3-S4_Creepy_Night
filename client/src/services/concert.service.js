import LocalSource from "@/datasource/controller";
import {getRequest, postRequest, putRequest} from "@/services/axios.service";

async function getAllConcertsFromAPI(){
    return getRequest('concerts', 'GETALLCONCERTS')
}
async function getConcertbyIdFromAPI(uuid) {
    return getRequest(`concerts/${uuid}`, 'GETCONCERTBYID')
}
async function ajouterAuPanierFromAPI(concert, utilisateur_id){
    const data = { concert, utilisateur_id }
    return postRequest('concerts/panier', data, 'POSTPANIER')
}
async function retirerDuPanierFromAPI(panier_item_id){
    return putRequest('concerts/panier/decrementation', panier_item_id, 'PUTDECREMENTPANIER')
}

export async function getAllConcerts() {
    return await getAllConcertsFromAPI()
}
export async function getConcertbyId(uuid) {
    return await getConcertbyIdFromAPI(uuid)
}
export async function ajouterAuPanier(concert) {
    let response;
    try {
        const utilisateur_id = concert.utilisateur_id;
        response = await ajouterAuPanierFromAPI(concert, utilisateur_id);
    } catch(err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'ajouter un concert au panier" };
    }
    return response;
}
export async function retirerDuPanier(item) {
    let response;
    try {
        response = await retirerDuPanierFromAPI(item.panier_id);
    } catch (err) {
        response = { error: 1, status: 404, data: "Erreur réseau, impossible d'incrémenter la quantité" };
    }
    return response;
}

async function viderPlaceFromLocalSource(placeId){
    return LocalSource.viderPlace(placeId)
}

async function viderPlace(placeId) {
    let response;
    try {
        response = await viderPlaceFromLocalSource(placeId)
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible d\'enlever ce concert au panier' };
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

async function getAllReservationsFromAPI() {
    return await getRequest('reservConcert');
}

export async function getAllReservations() {
    try {
        let res = await getAllReservationsFromAPI();
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("get all reservations", error);
        return { error: 1, message: error.message };
    }
}

export default {
    ajouterAuPanier,
    viderPlace,
    addReservationConcert,
    getReservationConcertById
};