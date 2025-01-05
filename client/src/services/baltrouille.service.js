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
async function getTaillesDeguisementFromLocalSource(deguisementId) {
    return LocalSource.getTailleDeguisement(deguisementId);
}
async function getDeguisementBySoireeFromLocalSource(soireeId) {
    return LocalSource.getDeguisementBySoiree(soireeId)
}
async function addDeguisementPanierFromLocalSource(deguisement){
    return LocalSource.addDeguisementPanier(deguisement)
}
async function incrementerQuantiteFromLocalSource(deguisement){
    return LocalSource.incrementerQuantite(deguisement)
}
async function diminuerQuantiteFromLocalSource(deguisement){
    return LocalSource.diminuerQuantite(deguisement)
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
async function getTailleDeguisement(deguisementId) {
    let response;
    try {
        response = await getTaillesDeguisementFromLocalSource(deguisementId);
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
async function addDeguisementPanier(deguisement) {
    let response;
    try {
        response = await addDeguisementPanierFromLocalSource(deguisement)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer la liste des déguisements pour cette soirée' };
    }
    return response;
}
async function incrementerQuantite(deguisement) {
    let response;
    try {
        response = await incrementerQuantiteFromLocalSource(deguisement)
        console.log(response)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible d\'incrémenter la quantité de ce déguisement' };
    }
    return response;
}
async function diminuerQuantite(deguisement) {
    let response;
    try {
        response = await diminuerQuantiteFromLocalSource(deguisement)
        console.log(response)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de diminuer la quantité de ce déguisement' };
    }
    return response;
}

export default {
    getAllSoireeBaltrouille,
    getSoireeBaltrouilleById,
    getAllDeguisement,
    getDeguisementById,
    getTailleDeguisement,
    getDeguisementBySoiree,
    addDeguisementPanier,
    incrementerQuantite,
    diminuerQuantite
}