const cashlessService = require("../services/cashless.services.pg");

exports.updateFunds = async (req, res) => {
    const { idUser, amount, operation, details } = req.body;
    try {
        const result = await cashlessService.updateFunds(idUser, amount, operation, details);
        if (!result) {
            return res.status(500).json({ error: 1, data: "Erreur lors de la mise à jour des fonds" });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans updateFunds :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};

exports.checkBankCard = async (req, res) => {
    const { nom, numeroCarte, dateExpiration, cvv } = req.body;
    try {
        const isValid = await cashlessService.checkBankCard(nom, numeroCarte, dateExpiration, cvv);
        if (isValid) {
            return res.status(200).json({ error: 0, data: "Carte validée" });
        } else {
            return res.status(400).json({ error: 1, data: "Coordonnées bancaires invalides" });
        }
    } catch (error) {
        console.error("Erreur dans checkBankCard :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};