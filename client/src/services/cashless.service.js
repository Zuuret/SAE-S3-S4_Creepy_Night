import LocalSource from "@/datasource/controller";

async function getAllTransactionsFromLocalSource(){
    return LocalSource.getAllTransactions();
}

async function updateFundsToLocalSource(idUser, amount){
    return LocalSource.updateFunds(idUser, amount);
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

async function updateFunds(idUser, amount) {
    let response;
    try {
        response = await updateFundsToLocalSource(idUser, amount);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de mettre à jour le solde' };
    }
    return response;
}

export default {
    getAllTransactions,
    updateFunds
}