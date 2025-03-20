
const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const acheterBilletService = require("../services/achat_billet.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.acheterBillet = async (req, res) => {
    const { utilisateurId, activiteId } = req.body;

    try {
        const resultat = await acheterBilletService.acheterBillet(utilisateurId, activiteId);
        res.status(200).send(resultat);
    } catch (error) {
        console.error(error);
        if (error.message === "Solde insuffisant" || error.message === "Aucune place disponible") {
            res.status(400).send(error.message);
        } else {
            res.status(500).send("Erreur lors de l'achat du billet");
        }
    }
};

exports.getBilletsFestival = async (req,res) => {
    const billets = await acheterBilletService.getBilletsFestival();
    if (!billets) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: billets });
}

