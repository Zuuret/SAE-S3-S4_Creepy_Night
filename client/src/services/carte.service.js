import { getRequest, putRequest } from './axios.service';

async function getEmplacementFromAPI() {
    return await getRequest('emplacement');
}

async function updateEmplacementFromAPI(data) {
    return await putRequest('emplacement', data);
}

async function getIconeFromAPI() {
    return await getRequest('icone-carte');
}

export async function getEmplacement() {
    try {
        const res = await getEmplacementFromAPI();
        console.log("Emplacement récupéré:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'emplacement", error);
        return { error: 1, message: "Erreur lors de la récupération de l'emplacement" };
    }
}

export async function updateEmplacement(id, nom, coord_x, coord_y, prestataire_id, icone_id) {
    try {
        const res = await updateEmplacementFromAPI({ id, nom, coord_x, coord_y, prestataire_id, icone_id });
        console.log("Emplacement mis à jour:", res.data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'emplacement", error);
        return { 
            error: 1, 
            message: error.response?.data?.error || "Erreur lors de la mise à jour de l'emplacement" 
        };
    }
}

export async function getIcone() {
    try {
        const res = await getIconeFromAPI();
        console.log("Icône récupérées:", res.data); // Affiche toutes les icônes
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération des icônes", error);
        return { error: 1, message: "Erreur lors de la récupération des icônes" };
    }
}