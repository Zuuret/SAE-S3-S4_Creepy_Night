import LocalSource from "@/datasource/controller";

async function getOeuvresFromLocalSource() {
    return LocalSource.getOeuvres();
}

async function setOeuvreInLocalSource(oeuvre) {
    return LocalSource.setDecision(oeuvre);
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

async function setOeuvre(oeuvre) {
    let response = null;
    try {
        response = await setOeuvreInLocalSource(oeuvre);
        return response;
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'injecter l'oeuvre"  }
    }
    return response
}

export default {
    getOeuvres,
    setOeuvre,
}