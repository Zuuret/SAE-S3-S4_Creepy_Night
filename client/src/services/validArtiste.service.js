import LocalSource from "@/datasource/controller";

async function getArtistesFromLocalSource() {
    return LocalSource.getArtistes();
}

async function setDecisionInLocalSource(artiste) {
    return LocalSource.setDecision(artiste);
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


async function setDecision(artiste) {
    let response = null;
    try {
        response = await setDecisionInLocalSource(artiste);
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer la decision concernant l'artiste"  }
    }
    return response
}

export default {
    getArtistes,
    setDecision
}