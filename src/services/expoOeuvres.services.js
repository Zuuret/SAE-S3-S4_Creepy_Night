import LocalSource from "@/datasource/controller";

async function getOeuvresFromLocalSource() {
    return LocalSource.getOeuvres();
}
async function getOeuvres() {
    let response = null;
    try {
        response = await getOeuvresFromLocalSource();
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des oeuvres'  }
    }
    return response
}
export default {
    getOeuvres,
}