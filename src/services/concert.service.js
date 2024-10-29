import LocalSource from "@/datasource/controller";

async function getConcertFromLocalSource() {
    return LocalSource.getConcert()
}

async function getConcert() {
    let response = null;
    try {
        response = await getConcertFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des utilisateurs'  }
    }
    return response
}

export default {
    getConcert,
}