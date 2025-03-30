import LocalSource from "@/datasource/controller";
import { getRequest } from "./axios.service";
import { deleteRequest } from "./axios.service";
import { postRequest } from "./axios.service";

async function ajoutUtilisateurFromLocalSource(data){
    return LocalSource.ajoutUtilisateur(data)
}
async function ajoutOrganisateurFromLocalSource(data){
    return LocalSource.ajoutOrganisateur(data)
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
async function getAllPrestataireFromAPI() {
    return await getRequest('prestataires')
}

async function getAllOrganisateurFromAPI() {
    return await getRequest('organisateurs')
}

async function getAllUtilisateurFromAPI() {
    return await getRequest('users')
}

async function getDemandesOrganisateursFromAPI() {
    return await getRequest('demandeOrga')
}

async function getDemandesPrestatairesFromAPI() {
    return await getRequest('demandePresta')
}

async function deleteDemandePrestataireFromAPI(id) {
    return await deleteRequest(`demandePresta/${id}`);
}

async function deleteDemandeOrganisateurFromAPI(id) {
    return await deleteRequest(`demandeOrga/${id}`);
}

async function insertOrganisateurFromAPI(payload) {
    return await postRequest("organisateurs", payload);
}

async function insertPrestataireFromAPI(payload) {
    return await postRequest("prestataires", payload);
}

async function getUserByIdFromAPI(uuid) {
    return await getRequest(`users/${uuid}`);
}

async function getPrestataireByIdFromAPI(uuid) {
    return await getRequest(`prestataires/${uuid}`);
}

async function getUserbyIdFromLocalSource(idUser){
    return LocalSource.getUserById(idUser)
}
async function getOrganisateurbyIdFromLocalSource(idOrganisateur){
    return LocalSource.getOrganisateurById(idOrganisateur)
}
async function updateDescriptionPrestataireFromLocalSource(id, nouvelleDescription){
    return LocalSource.updateDescriptionPrestataire(id, nouvelleDescription)
}
async function updateSocietePrestataireFromLocalSource(id, nouvelleSociete){
    return LocalSource.updateSocietePrestataire(id, nouvelleSociete)
}
async function updateThemePrestataireFromLocalSource(id, nouveauTheme){
    return LocalSource.updateThemePrestataire(id, nouveauTheme)
}
async function updateAdressePrestataireFromLocalSource(id, nouvelleAdresse){
    return LocalSource.updateAdressePrestataire(id, nouvelleAdresse)
}
async function updateImagePrestataireFromLocalSource(id, nouvelleImage){
    return LocalSource.updateImagePrestataire(id, nouvelleImage)
}
async function updateImage2PrestataireFromLocalSource(id, nouvelleImage2){
    return LocalSource.updateImage2Prestataire(id, nouvelleImage2)
}
async function updateLogoPrestataireFromLocalSource(id, nouveauLogo){
    return LocalSource.updateLogoPrestataire(id, nouveauLogo)
}

async function getAllPrestataireFromLocalSource() {
    return LocalSource.getAllPrestataire()
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
async function ajoutPrestataire(data) {
    let response;
    try {
        response = await demandeInscriptionPrestataire(data);
    } catch (err) {
        response = { error: 1, status: 404, data: "erreur réseau, impossible d'ajouter un prestataire" };
    }
    return response;
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

export async function getUserById(uuid) {
    let response;
    try {
        response = await getUserByIdFromAPI(uuid);
    } catch (err) {
        response = {
            error: 1,
            status: 404,
            data: "Erreur réseau, impossible de récupérer l'utilisateur."
        };
    }
    return response;
}

export async function getPrestataireById(uuid) {
    let response;
    try {
        response = await getPrestataireByIdFromAPI(uuid);
    } catch (err) {
        response = {
            error: 1,
            status: 404,
            data: "Erreur réseau, impossible de récupérer l'utilisateur."
        };
    }
    return response;
}

async function getOrganisateurbyId(idPrestataire){
    let response;
    try {
        response = await getOrganisateurbyIdFromLocalSource(idPrestataire)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de récupérer l'id du prestataire" }
    }
    return response
}

async function updateDescriptionPrestataire(id, nouvelleDescription){
    let response;
    try {
        response = await updateDescriptionPrestataireFromLocalSource(id, nouvelleDescription)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier la description du prestataire" }
    }
    return response
}

async function updateSocietePrestataire(id, nouvelleSociete){
    let response;
    try {
        response = await updateSocietePrestataireFromLocalSource(id, nouvelleSociete)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier le nom du prestataire" }
    }
    return response
}

async function updateThemePrestataire(id, nouveauTheme){
    let response;
    try {
        response = await updateThemePrestataireFromLocalSource(id, nouveauTheme)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier le theme du prestataire" }
    }
    return response
}

async function updateAdressePrestataire(id, nouvelleAdresse){
    let response;
    try {
        response = await updateAdressePrestataireFromLocalSource(id, nouvelleAdresse)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier l'adresse du prestataire" }
    }
    return response
}

async function updateImagePrestataire(id, nouvelleImage){
    let response;
    try {
        response = await updateImagePrestataireFromLocalSource(id, nouvelleImage)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier l'image du prestataire" }
    }
    return response
}

async function updateImage2Prestataire(id, nouvelleImage2){
    let response;
    try {
        response = await updateImage2PrestataireFromLocalSource(id, nouvelleImage2)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier l'image 2 du prestataire" }
    }
    return response
}

async function updateLogoPrestataire(id, nouveauLogo){
    let response;
    try {
        response = await updateLogoPrestataireFromLocalSource(id, nouveauLogo)
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible de modifier le logo du prestataire" }
    }
    return response
}

export async function getAllUtilisateurs() {
    try{
        let res = await getAllUtilisateurFromAPI();
        return {error:0, data:res.data}
    }catch(error){
        console.error("get all utilisateurs", error)
    }
}

export async function getAllOrganisateurs() {
    try{
        let res = await getAllOrganisateurFromAPI();
        return {error:0, data:res.data}
    }catch(error){
        console.error("get all organisateurs", error)
    }
}

export async function getAllPrestataires() {
    try {
        const res = await getAllPrestataireFromAPI();
        
        // La réponse est directement le tableau des prestataires
        if (Array.isArray(res)) {
            return { 
                error: 0, 
                data: res // Utilise directement le tableau comme data
            };
        }
        
        // Si la réponse a déjà le format attendu
        if (res && res.data) {
            return res;
        }
        
        console.error("Format de réponse inattendu:", res);
        return { 
            error: 1, 
            message: "Format de réponse API inattendu",
            data: [] 
        };
        
    } catch(error) {
        console.error("Erreur dans getAllPrestataires:", error);
        return { 
            error: 1, 
            message: error.message || "Erreur lors de la récupération des prestataires",
            data: [] 
        };
    }
}

export async function getDemandesOrganisateurs() {
    try{
        let res = await getDemandesOrganisateursFromAPI();
        return {error:0, data:res.data}
    }catch(error){
        console.error("get demandes organisateurs", error)
    }
}

export async function getDemandesPrestataires() {
    try{
        let res = await getDemandesPrestatairesFromAPI();
        return {error:0, data:res.data}
    }catch(error){
        console.error("get demandes prestataires", error)
    }
}

export async function deleteDemandePrestataire(id) {
    try {
        const res = await deleteDemandePrestataireFromAPI(id);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("delete demandes prestataires", error);
        return { error: 1, data: "Erreur lors de la suppression" };
    }
}

export async function deleteDemandeOrganisateur(id) {
    try {
        const res = await deleteDemandeOrganisateurFromAPI(id);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("delete demandes organisateur", error);
        return { error: 1, data: "Erreur lors de la suppression" };
    }
}

export async function insertOrganisateur(payload) {
    try {
      const res = await insertOrganisateurFromAPI(payload);
      return { error: 0, data: res.data };
    } catch (error) {
      console.error("insert organisateur", error);
      return { error: 1, data: "Erreur lors de l'insertion" };
    }
  }
  
export async function insertPrestataire(payload) {
    try {
        const res = await insertPrestataireFromAPI(payload);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("insert prestataire", error);
        return { error: 1, data: "Erreur lors de l'insertion" };
    }
}

export async function demandeInscriptionPrestataire(data) {
    let response;
    try {
        response = await LocalSource.demandeInscriptionPrestataire(data);
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'envoyer la demande" };
    }
    return response;
}

export async function demandeInscriptionOrganisateur(data) {
    let response;
    try {
        response = await LocalSource.demandeInscriptionOrganisateur(data);
    } catch(err) {
        response = {error: 1, status: 404, data: "erreur réseau, impossible d'envoyer la demande" };
    }
    return response;
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
    getDemandesOrganisateurs,
    getDemandesPrestataires,
    getUserbyId,
    getOrganisateurbyId,
    updateDescriptionPrestataire,
    updateSocietePrestataire,
    updateThemePrestataire,
    updateAdressePrestataire,
    updateImagePrestataire,
    updateImage2Prestataire,
    updateLogoPrestataire
}