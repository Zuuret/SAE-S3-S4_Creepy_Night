import LocalSource from "@/datasource/controller";

async function getAllSignalementFromLocalSource() {
    return LocalSource.getAllSignalements()
}

async function getAllSignalements() {
    let response;
    try {
        response = await getAllSignalementFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer la localisation de l'utilisateur"  }
    }
    return response
}

export default {
    getAllSignalements
}