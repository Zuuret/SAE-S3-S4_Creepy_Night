import data from '@/datasource/data.js';
import { getRequest } from './axios.service';

export async function getAllOrganisateurs() {
    return { error: 0, data: data.organisateurs }; 
}

export async function getAllPrestataires() {
    return { error: 0, data: data.prestataires };
}

async function getAllBilletsFromAPI() {
    return await getRequest('achat')
}

export async function getAllBillets() {
    try{
        let res = await getAllBilletsFromAPI();        
        return {error:0, data:res.data}
    }catch(error){
        console.error("get all billets error", error)
    } 
}

export async function getBilletsAchetesAujourdHui() {
    try {
        let res = await getAllBilletsFromAPI();  // Appeler l'API pour récupérer les billets
        console.log("🎫 Billets récupérés:", res.data); // Afficher les billets récupérés

        // Créer la date actuelle sans heure en format "YYYY-MM-DD" (en UTC)
        const aujourdHui = new Date();
        const aujourdHuiFormat = aujourdHui.toISOString().split('T')[0]; // "YYYY-MM-DD"

        // Filtrer les billets achetés aujourd'hui
        const billetsAujourdhui = res.data.filter(billet => {
            // Créer une nouvelle date à partir de la date d'achat du billet
            const dateAchat = new Date(billet.date_achat);
            // Formater la date d'achat au format "YYYY-MM-DD" (en UTC)
            const dateAchatFormat = dateAchat.toISOString().split('T')[0]; // "YYYY-MM-DD"

            console.log("🎫 Date d'achat:", dateAchatFormat); // Afficher les dates des billets

            // Comparer les dates sans l'heure (en UTC)
            return dateAchatFormat === aujourdHuiFormat;
        });

        console.log("🎫 Billets achetés aujourd'hui:", billetsAujourdhui); // Voir les billets filtrés

        return { error: 0, data: billetsAujourdhui };
    } catch (error) {
        console.error("get billets aujourd'hui error", error);
        return { error: 1, message: "Erreur lors de la récupération des billets du jour" };
    }
}