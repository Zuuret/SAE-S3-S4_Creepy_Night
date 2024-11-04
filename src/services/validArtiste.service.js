import LocalSource from "@/datasource/controller";

async function getArtistesFromLocalSource() {
    return LocalSource.getArtistes();
}

async function getArtistes() {
    let response = null;
    try {
        response = await getArtistesFromLocalSource();
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des artistes'  }
    }
    return response
}

export default {
    getArtistes
}