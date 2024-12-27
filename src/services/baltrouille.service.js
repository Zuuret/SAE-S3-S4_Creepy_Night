import LocalSource from "@/datasource/controller";

async function getAllDeguisementFromLocalSource(){
    return LocalSource.getAllDeguisement();
}

async function getDeguisementByIdFromLocalSource(deguisementId){
    return LocalSource.getDeguisementById(deguisementId)
}

async function getTaillesDeguisementFromLocalSource(deguisementId) {
    return LocalSource.getTailleDeguisement(deguisementId);
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

export default {
    getAllDeguisement,
    getDeguisementById,
    getTailleDeguisement
}