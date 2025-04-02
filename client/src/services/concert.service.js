import LocalSource from "@/datasource/controller";
import { getRequest } from "./axios.service";
import { postRequest } from "./axios.service";
import { deleteRequest } from "./axios.service";

async function getConcertsFromAPI() {
    return await getRequest('concerts');
}

async function getConcertByIdFromAPI(uuid) {
    return await getRequest(`concerts/${uuid}`, 'CONCERTBYID');
}

async function getReservConcertFromAPI() {
    return await getRequest('reservConcert');
}

async function getReservConcertByIdFromAPI() {
    return await getRequest('reservConcert/${uuid}', 'RESERVCONCERTBYID');
}

async function insertReservConcertFromAPI(payload) {
    return await postRequest("reservConcert", payload, '');
}

async function deleteReservConcertFromAPI(id) {
    return await deleteRequest(`reservConcert/${id}`);
}

async function getReservConcertByUserIdFromAPI(userId) {
    return await getRequest(`reservConcert/user/${userId}`);
  }

export async function getAllConcerts() {
    try {
        const res = await getConcertsFromAPI();
        console.log("Concerts récupéré:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération des concerts", error);
        return { error: 1, message: "Erreur lors de la récupération des concerts" };
    }
}

export async function getConcertById(uuid) {
    try {
        const res = await getConcertByIdFromAPI(uuid);
        console.log('Concert récupéré depuis l\'API:', res.data);
        return { error: 0, data: res.data }; // Retourner la structure { error, data }
    } catch (error) {
        console.error("Erreur lors de la récupération du concert", error);
        return { 
            error: 1, 
            data: "Erreur réseau, impossible de récupérer le concert." 
        };
    }
}

export async function getAllReservConcert() {
    try {
        const res = await getReservConcertFromAPI();
        console.log("Réservations de concert récupéré:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations de concert", error);
        return { error: 1, message: "Erreur lors de la récupération des réservations de concert" };
    }
}

export async function getReservConcertById(uuid) {
    let response;
    try {
        response = await getReservConcertByIdFromAPI(uuid);
    } catch (err) {
        response = {
            error: 1,
            status: 404,
            data: "Erreur réseau, impossible de récupérer la réservation de concert."
        };
    }
    return response;
}

export async function insertReservConcert(payload) {
    try {
      const res = await insertReservConcertFromAPI(payload);
      return { error: 0, data: res.data };
    } catch (error) {
      console.error("insert reservConcert", error);
      return { error: 1, data: "Erreur lors de l'insertion" };
    }
}
 
export async function deleteReservConcert(id) {
    try {
        const res = await deleteReservConcertFromAPI(id);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("delete demandes reservConcert", error);
        return { error: 1, data: "Erreur lors de la suppression" };
    }
}

export async function getReservConcertByUserId(userId) {
    try {
      const res = await getReservConcertByUserIdFromAPI(userId);
      return { error: 0, data: res.data };
    } catch (error) {
      return { error: 1, data: [] };
    }
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

async function retirerDuPanierFromLocalSource(placeId){
    return LocalSource.retirerDuPanier(placeId)
}

async function retirerDuPanier(placeId) {
    let response;
    try {
        response = await retirerDuPanierFromLocalSource(placeId)
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de retirer une panier' };
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

export default {
    getAllConcerts,
    getAllPlaceConcert,
    getPlacesConcertsbyId,
    ajouterAuPanier,
    retirerDuPanier,
    viderPlace,
    addReservationConcert,
    getReservationConcertById
};