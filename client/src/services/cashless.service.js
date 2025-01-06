import LocalSource from "@/datasource/controller";

async function getAllTransactionsFromLocalSource(){
    return LocalSource.getAllTransactions();
}

async function updateFundsToLocalSource(data){
    return LocalSource.updateFunds(data);
}

async function checkBankCardFromLocalSource(data) {
    return LocalSource.validerPaiementBancaire(data);
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

async function updateFunds(data) {
    let response;
    try {
        response = await updateFundsToLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de mettre à jour le solde' };
    }
    return response;
}

async function checkBankCard(data) {
    let response;
    try {
        response = await checkBankCardFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de vérifier le compte bancaire' };
    }
    return response;
}


export default {
    getAllTransactions,
    updateFunds,
    checkBankCard
}