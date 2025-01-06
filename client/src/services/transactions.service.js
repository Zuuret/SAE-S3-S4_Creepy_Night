import data from '@/datasource/data.js'; // Assurez-vous que le chemin est correct

export async function addTransactionToDatabase(paymentDetails) {
    // Créez un nouvel objet de transaction
    const newTransaction = {
        id: data.transactions.length + 1, // Assurez-vous que l'ID est unique
        date: new Date().toISOString().split('T')[0],
        operation: 'Achat Billet',
        details: `Achat d'un billet pour le montant de ${paymentDetails.amount} €`,
        amount: -paymentDetails.amount,
        id_utilisateur: paymentDetails.id_utilisateur,
    };

    // Ajoutez la nouvelle transaction à la liste
    data.transactions.push(newTransaction); // Assurez-vous que data.transactions existe

    console.log("Transaction ajoutée :", newTransaction);
    return { error: 0, data: "Transaction réussie" };
}

export function getBilletsAchatAujourdHui() {
    const today = new Date().toISOString().split('T')[0];
    const count = data.transactions.filter(transaction => transaction.date === today).length;
    return { error: 0, data: count };
} 