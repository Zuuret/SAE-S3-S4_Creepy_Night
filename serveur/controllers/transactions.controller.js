const transactionsService = require("../services/transactions.services.pg");

exports.consulterHistorique = async (req, res) => {
    const { utilisateurId } = req.params;

    try {
        const transactions = await transactionsService.getHistoriqueTransactions(utilisateurId);
        res.status(200).send({ data: transactions });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Erreur lors de la récupération des transactions." });
    }
};
