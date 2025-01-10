import data from '@/datasource/data.js';

export async function addTransactionToDatabase(paymentDetails) {
    const newTransaction = {
        id: data.transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        operation: 'Achat Billet',
        details: `Achat d'un billet pour le montant de ${paymentDetails.amount} €`,
        amount: -paymentDetails.amount,
        id_utilisateur: paymentDetails.id_utilisateur,
    };
    data.transactions.push(newTransaction);

    console.log("Transaction ajoutée :", newTransaction);
    return { error: 0, data: "Transaction réussie" };
}

export function getBilletsAchatAujourdHui() {
    const today = new Date().toISOString().split('T')[0];
    const count = data.transactions.filter(transaction => transaction.date === today).length;
    return { error: 0, data: count };
} 