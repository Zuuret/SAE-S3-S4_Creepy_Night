import LocalSource from "@/datasource/controller";
import {getRequest, postRequest, putRequest} from "@/services/axios.service";

async function getAllTransactionsFromLocalSource(){
    return LocalSource.getAllTransactions();
}

async function getAllTransactions() {
    let response;
    try {
        response = await getAllTransactionsFromLocalSource();
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des transactions' };
    }
    return response;
}

async function updateFundsFromAPI(data){
    return await putRequest("cashless/updateFunds", data);
}

async function updateFunds(data) {
    let response;
    try {
        response = await updateFundsFromAPI(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de mettre à jour le solde' };
    }
    return response;
}

async function checkBankCardFromAPI(data) {
    return await postRequest("cashless/checkBankCard", data);
}

async function checkBankCard(data) {
    let response;
    try {
        response = await checkBankCardFromAPI(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de vérifier le compte bancaire' };
    }
    return response;
}

async function getUserTransactionsFromAPI(data) {
    return await getRequest(`transactions/${data}`);
}

export async function getUserTransactions(data) {
    try {
        const res = await getUserTransactionsFromAPI(data);
        return { error: 0, data: res.data };
    } catch (error) {
        console.error("Erreur lors de la récupération des transactions de l'utilisateur", error);
        return { error: 1, message: "Erreur lors de la récupération des transactions de l'utilisateur" };
    }
}



export default {
    getAllTransactions,
    updateFunds,
    checkBankCard,
    getUserTransactions
}