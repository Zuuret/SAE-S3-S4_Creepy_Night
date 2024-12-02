import LocalSource from "@/datasource/controller";

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

export default {
    getAllTransactions
}