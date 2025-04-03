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

async function getAllReservationsFromAPI() {
    return await getRequest('reservConcert');
  }
  
async function getReservationByIdFromAPI(uuid) {
    return await getRequest(`reservConcert/${uuid}`);
}

async function insertReservConcertFromAPI(payload) {
    return await postRequest("reservConcert", payload, '');
}

async function deleteReservConcertFromAPI(id) {
    return await deleteRequest(`reservConcert/${id}`);
}

async function getReservConcertByUserIdFromAPI(userId) {
    const allReservations = await getRequest('reservConcert');
    
    return allReservations.data.filter(reservation => 
      reservation.userId === userId
    );
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

export async function getAllReservations() {
    try {
      let res = await getAllReservationsFromAPI();
      return { error: 0, data: res.data };
    } catch (error) {
      console.error("get all reservations", error);
      return { error: 1, message: error.message };
    }
  }
  
export async function getReservationById(uuid) {
    try {
        let res = await getReservationByIdFromAPI(uuid);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("get reservation by id", error);
        return { error: 1, message: error.message };
    }
}

export async function insertReservConcert(payload) {
    try {
        // 1. D'abord créer la réservation via la fonction dédiée
        const resReservation = await insertReservConcertFromAPI({
            utilisateur_id: payload.utilisateur_id,
            concert_id: payload.concert_id,
            nb_places: payload.nb_places,
            date_reservation: payload.date_reservation
        });

        // 2. Ensuite créer la transaction via la route cashless
        const transactionPayload = {
            idUser: payload.utilisateur_id,
            amount: -(payload.prix_total || 0), // Montant négatif (débit)
            operation: 'RESERVATION_CONCERT',
            details: `Réservation ${payload.nb_places} place(s) pour concert ${payload.concert_id}`
        };
        
        await postRequest("cashless", transactionPayload, '');

        return { 
            error: 0, 
            data: resReservation.data 
        };
    } catch (error) {
        console.error("Erreur lors de l'insertion de la réservation et transaction", error);
        
        // Gestion des erreurs spécifiques
        let errorCode = 1;
        let errorMessage = "Erreur lors de la réservation";

        if (error.response) {
            if (error.response.status === 402) {
                errorCode = 2;
                errorMessage = "Solde insuffisant pour effectuer la réservation";
            } else if (error.response.status === 404) {
                errorCode = 3;
                errorMessage = "Concert non trouvé";
            } else if (error.response.data?.message) {
                errorMessage = error.response.data.message;
            }
        }
        
        return { 
            error: errorCode, 
            data: errorMessage 
        };
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
      const reservations = await getReservConcertByUserIdFromAPI(userId);
      return { error: 0, data: reservations };
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