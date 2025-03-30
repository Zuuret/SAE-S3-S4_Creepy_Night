const transactionsService = require("../services/transactions.services.pg");

exports.consulterHistorique = async (req, res) => {
    const { utilisateurId } = req.params;

    try {
        const transactions = await transactionsService.getHistoriqueTransactions(utilisateurId);
        if (transactions.length === 0) {
            return res.status(404).send({ error: "Aucune transaction trouvée pour cet utilisateur." });
        }
        res.status(200).send({ data: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la récupération des transactions." });
    }
};
