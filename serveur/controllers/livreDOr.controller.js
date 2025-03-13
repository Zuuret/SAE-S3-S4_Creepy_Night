const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const livreDOrService = require("../services/livreDOr.services.pg");

exports.saveLivreDOr = async (req, res) => {
    const uuid = uuidv4();
    const {} = req.body;
    const resultat = await livreDOrService.insertLivreDOr(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getLivreDOr = async (req, res) => {
    const livreDOrs = await livreDOrService.getLivreDOr();
    if (!livreDOrs) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: livreDOrs });
};

exports.getLivreDOrById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const livreDOrs = await livreDOrService.getLivreDOr();
        const livreDOr = livreDOrs.find(u => u.id == uuid);
        if (!livreDOr) {
            return res.status(404).json({ error: 'LivreDOr non trouvé' });
        }
        return res.status(200).json({ data: livreDOr });
    } catch (error) {
        console.error('Erreur lors de la récupération de la livreDOr :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateLivreDOr = async (req, res) => {
    const uuid = req.params.uuid;
    const {} = req.body;
    const resultat = await livreDOrService.updateLivreDOr(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTRÉE");
};

exports.deleteLivreDOr = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await livreDOrService.deleteLivreDOr(uuid);
        if (!result) {
            return res.status(200).json({ message: 'LivreDOr supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'LivreDOr non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la livreDOr :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
