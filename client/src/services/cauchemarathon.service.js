import LocalSource from "@/datasource/controller";

async function buyTicketCauchemarathonFromLocalSource(data) {
    return LocalSource.buyTicketCauchemarathon(data);
}

async function buyTicketCauchemarathon(data) {
    let response;
    try {
        response = await buyTicketCauchemarathonFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de vérifier le compte bancaire' };
    }
    return response;
}

export default {
    buyTicketCauchemarathon
}