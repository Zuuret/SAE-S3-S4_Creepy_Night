const transactionsService = require("../services/transactions.services.pg");
exports.consulterHistorique = async (req, res) => {
    const { utilisateurId } = req.params;

    try {
        const transactions = await transactionsService.getHistoriqueTransactions(utilisateurId);
        console.log("Transactions récupérées avec succès :", transactions);

        if (!res.headersSent) { // 🔹 Vérifie qu'aucune réponse n'a encore été envoyée
            res.status(200).send({ data: transactions });
        }
    } catch (error) {
        console.error("Erreur dans consulterHistorique :", error);

        if (!res.headersSent) { // 🔹 Empêche un deuxième envoi de réponse
            res.status(500).send({ error: "Erreur lors de la récupération des transactions." });
        }
    }
};
