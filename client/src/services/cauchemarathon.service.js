import { postRequest } from "@/services/axios.service";

async function buyTicketCauchemarathonFromAPI(data) {
    return await postRequest("cauchemarathon/buyTicket", data);
}

async function buyTicketCauchemarathon(data) {
    let response
    try {
        response = await buyTicketCauchemarathonFromAPI(data);
    } catch (err) {
        console.error("Erreur dans buyTicketCauchemarathon:", err);
        return { error: 1, status: 404, data: 'Erreur réseau, impossible d\'acheter le billet' };
    }
    return response;
}

export default {
    buyTicketCauchemarathon
};