import { getRequest, putRequest } from './axios.service';

async function getTexteAccueilFromAPI() {
    return await getRequest('texte-accueil');
}

async function updateTexteAccueilFromAPI(data) {
    return await putRequest('texte-accueil', data);
}

export async function getTexteAccueil() {
    try {
        const res = await getTexteAccueilFromAPI();
        console.log("Texte d'accueil récupéré:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération du texte d'accueil", error);
        return { error: 1, message: "Erreur lors de la récupération du texte d'accueil" };
    }
}

export async function updateTexteAccueil(titre, contenu) {
    try {
        const res = await updateTexteAccueilFromAPI({ titre, contenu });
        console.log("Texte d'accueil mis à jour:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du texte d'accueil", error);
        return { error: 1, message: "Erreur lors de la mise à jour du texte d'accueil" };
    }
}