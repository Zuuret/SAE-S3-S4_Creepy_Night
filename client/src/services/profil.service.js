import LocalSource from "@/datasource/controller";

async function ajoutUtilisateurFromLocalSource(data){
    return LocalSource.ajoutUtilisateur(data)
}
async function ajoutOrganisateurFromLocalSource(data){
    return LocalSource.ajoutOrganisateur(data)
}
async function ajoutPrestataireFromLocalSource(data){
    return LocalSource.ajoutPrestataire(data)
}
async function loginSiteUtilisateurFromLocalSource(data){
    return LocalSource.loginSiteUtilisateur(data)
}
async function loginSiteOrganisateurFromLocalSource(data){
    return LocalSource.loginSiteOrganisateur(data)
}
async function loginSitePrestataireFromLocalSource(data){
    return LocalSource.loginSitePrestataire(data)
}
async function getAllUtilisateurFromLocalSource() {
    return LocalSource.getAllUtilisateur()
}
async function getAllOrganisateurFromLocalSource() {
    return LocalSource.getAllOrganisateur()
}
async function getAllPrestataireFromLocalSource() {
    return LocalSource.getAllPrestataire()
}
async function getUserbyIdFromLocalSource(idUser){
    return LocalSource.getUserById(idUser)
}

async function ajoutUtilisateur(data) {
    let response;
    try {
        response = await ajoutUtilisateurFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un utilisateur"  }
    }
    return response
}
async function ajoutOrganisateur(data) {
    let response;
    try {
        response = await ajoutOrganisateurFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un organisateur"  }
    }
    return response
}
async function ajoutPrestataire(data){
    let response;
    try {
        response = await ajoutPrestataireFromLocalSource(data)
    } catch (err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un prestataire"  }
    }
    return response
}
async function loginSiteUtilisateur(data) {
    let response;
    try {
        response = await loginSiteUtilisateurFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}
async function loginSiteOrganisateur(data) {
    let response;
    try {
        response = await loginSiteOrganisateurFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}
async function loginSitePrestataire(data) {
    let response;
    try {
        response = await loginSitePrestataireFromLocalSource(data)
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}
async function getAllUtilisateur() {
    let response;
    try {
        response = await getAllUtilisateurFromLocalSource()
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des utilisateurs'  }
    }
    return response
}
async function getAllOrganisateur() {
    let response;
    try {
        response = await getAllOrganisateurFromLocalSource()
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des organisateurs'  }
    }
    return response
}
async function getAllPrestataire() {
    let response;
    try {
        response = await getAllPrestataireFromLocalSource()
    } catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des prestataires'  }
    }
    return response
}
async function getUserbyId(idUser){
    let response;
    try {
        response = await getUserbyIdFromLocalSource(idUser)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer l'id de l'utilisateur" }
    }
    return response
}

export default {
    ajoutUtilisateur,
    ajoutOrganisateur,
    ajoutPrestataire,
    loginSiteUtilisateur,
    loginSiteOrganisateur,
    loginSitePrestataire,
    getAllUtilisateur,
    getAllOrganisateur,
    getAllPrestataire,
    getUserbyId,
}