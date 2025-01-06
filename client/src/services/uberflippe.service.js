import LocalSource from '@/datasource/controller'

async function addDemandeUberflippeFromLocalSource(data){
    return LocalSource.addDemandeUberflippe(data)
}
async function getAllDemandeFromLocalSource(){
    return LocalSource.getAllDemande()
}

async function addDemandeUberFlippe(data) {
    let response;
    try {
        response = await addDemandeUberflippeFromLocalSource(data)
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter une demande UberFlippe'"  }
    }
    return response
}
async function getAllDemande() {
    let response;
    try {
        response = await getAllDemandeFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérerer les demandes d'UberFlippe"  }
    }
    return response
}

export default {
    addDemandeUberFlippe,
    getAllDemande
}
