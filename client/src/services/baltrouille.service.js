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
async function ajoutDeguisementFromLocalSource(deguisement) {
    return LocalSource.ajouterDeguisement(deguisement)
}
async function incrementerQuantiteDeguisementFromLocalSource(item) {
    return LocalSource.incrementerQuantiteDeguisement(item)
}
async function diminuerQuantiteDeguisementFromLocalSource(item) {
    return LocalSource.diminuerQuantiteDeguisement(item)
}
async function addLocationDeguisementFromLocalSource(idUser){
    return LocalSource.addLocationDeguisement(idUser)
}
async function getLocationDeguisementByIdFromLocalSource(utilisateurId){
    return LocalSource.getLocationDeguisementById(utilisateurId)
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
async function ajoutDeguisement(deguisement) {
    let response;
    try {
        response = await ajoutDeguisementFromLocalSource(deguisement)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer la liste des déguisements pour cette soirée' };
    }
    return response;
}
async function incrementerQuantiteDeguisement(item) {
    let response;
    try {
        response = await incrementerQuantiteDeguisementFromLocalSource(item)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible d\'incrémenter la quantité de ce déguisement' };
    }
    return response;
}
async function diminuerQuantiteDeguisement(item) {
    let response;
    try {
        response = await diminuerQuantiteDeguisementFromLocalSource(item)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de diminuer la quantité de ce déguisement' };
    }
    return response;
}
async function addLocationDeguisement(idUser) {
    let response;
    try {
        response = await addLocationDeguisementFromLocalSource(idUser)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible d\'ajouter un/des deguisement(s) a une reservation'};
    }
    return response;
}
async function getLocationDeguisementById(utilisateurId) {
    let response;
    try {
        response = await getLocationDeguisementByIdFromLocalSource(utilisateurId)
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur réseau, impossible de récupérer la liste des location pour cet id'};
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
    ajoutDeguisement,
    incrementerQuantiteDeguisement,
    diminuerQuantiteDeguisement,
    addLocationDeguisement,
    getLocationDeguisementById
}