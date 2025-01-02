import LocalSource from "@/datasource/controller";

function getAllBouteillesFromLocalSource(){
    return LocalSource.getAllBouteilles()
}

async function getAllBouteilles(){
    let response;
    try {
        response = await getAllBouteillesFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la bouteille'};
    }
    return response;
}

function getBouteillebyIdFromLocalSource(bouteilleId){
    return LocalSource.getBouteillebyId(bouteilleId)
}

async function getBouteillebyId(bouteilleId){
    let response;
    try {
        response = await getBouteillebyIdFromLocalSource(bouteilleId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la bouteille'};
    }
    return response;
}

function getAllCarresFromLocalSource(){
    return LocalSource.getAllCarres()
}

async function getAllCarres(){
    let response;
    try {
        response = await getAllCarresFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la bouteille'};
    }
    return response;
}

function getCarrebyIdFromLocalSource(carreId){
    return LocalSource.getCarrebyId(carreId)
}

async function getCarrebyId(carreId){
    let response;
    try {
        response = await getCarrebyIdFromLocalSource(carreId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le carre' };
    }
    return response;
}

async function getReservationCarihorreurFromLocalSource(id){
    return LocalSource.getReservationCarihorreur(id);
}

async function getReservationCarihorreur(id){
    let response;
    try {
        response = await getReservationCarihorreurFromLocalSource(id);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des déguisements' };
    }
    return response;
}

export default {
    getAllBouteilles,
    getBouteillebyId,
    getAllCarres,
    getCarrebyId,
    getReservationCarihorreur
}
