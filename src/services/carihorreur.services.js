import LocalSource from "@/datasource/controller";

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
    getReservationCarihorreur
}
