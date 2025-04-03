import { getRequest, putRequest } from './axios.service';

async function getTexteAccueilFromAPI() {
    const lang = localStorage.getItem('language') || 'fr';
    console.log('Langue actuelle pour API:', lang);
    return await getRequest(`texte-accueil?lang=${lang}`);
}

async function updateTexteAccueilFromAPI(data) {
    return await putRequest('texte-accueil', data);
}

export async function getTexteAccueil(lang = 'fr') {
    try {
        const res = await getTexteAccueilFromAPI();
        console.log("Texte d'accueil récupéré:", res.data);

        if (res.data && lang === 'en') {
            return {
                error: 0,
                data: {
                    titre: res.data.titre_en || res.data.titre,
                    contenu: res.data.contenu_en || res.data.contenu
                }
            };
        }
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