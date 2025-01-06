import LocalSource from "@/datasource/controller";

async function getAllSoireeBaltrouilleFromLocalSource(){
    return LocalSource.getAllSoireeBaltrouille();
}
async function getSoireeBaltrouilleByIdFromLocalSource(soireeId){
    return LocalSource.getSoireeBaltrouilleById(soireeId);
}
async function getAllDeguisementFromLocalSource(){
    return LocalSource.getAllDeguisement();
}
async function getDeguisementByIdFromLocalSource(deguisementId){
    return LocalSource.getDeguisementById(deguisementId)
}
async function getAllTailleDeguisementFromLocalSource(){
    return LocalSource.getAllTailleDeguisement()
}
async function getTaillesDeguisementByIdFromLocalSource(deguisementId) {
    return LocalSource.getTailleDeguisementById(deguisementId);
}
async function getDeguisementBySoireeFromLocalSource(soireeId) {
    return LocalSource.getDeguisementBySoiree(soireeId)
}

async function getAllSoireeBaltrouille(){
    let response;
    try {
        response = await getAllSoireeBaltrouilleFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des soirées' };
    }
    return response;
}
async function getSoireeBaltrouilleById(soireeId){
    let response;
    try {
        response = await getSoireeBaltrouilleByIdFromLocalSource(soireeId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer l\'id de la soirée' };
    }
    return response;
}
async function getAllDeguisement(){
    let response;
    try {
        response = await getAllDeguisementFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des déguisements' };
    }
    return response;
}
async function getDeguisementById(deguisementId){
    let response;
    try {
        response = await getDeguisementByIdFromLocalSource(deguisementId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le déguisement' };
    }
    return response;
}
async function getAllTailleDeguisement() {
    let response;
    try {
        response = await getAllTailleDeguisementFromLocalSource()
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste de taille des déguisement' };
    }
    return response;
}
async function getTailleDeguisementById(deguisementId) {
    let response;
    try {
        response = await getTaillesDeguisementByIdFromLocalSource(deguisementId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la taille du déguisement' };
    }
    return response;
}
async function getDeguisementBySoiree(soireeId) {
    let response;
    try {
        response = await getDeguisementBySoireeFromLocalSource(soireeId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer la liste des déguisements pour cette soirée' };
    }
    return response;
}

export default {
    getAllSoireeBaltrouille,
    getSoireeBaltrouilleById,
    getAllTailleDeguisement,
    getAllDeguisement,
    getDeguisementById,
    getTailleDeguisementById,
    getDeguisementBySoiree,
}