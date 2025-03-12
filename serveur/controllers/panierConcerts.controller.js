const { v4: uuidv4 } = require('uuid');
const panierConcertsService = require("../services/panierConcerts.services.pg");

exports.savePanierConcerts = async (req, res) => {
    const uuid = uuidv4();
    const {} = req.body;
    const resultat = await panierConcertsService.insertPanierConcerts(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getPanierConcerts = async (req, res) => {
    const panierConcerts = await panierConcertsService.getPanierConcerts();
    if (!panierConcerts) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: panierConcerts });
};

exports.getPanierConcertById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const panierConcerts = await panierConcertsService.getPanierConcerts();
        const panierConcert = panierConcerts.find(u => u.id == uuid);
        if (!panierConcert) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }
        return res.status(200).json({ data: panierConcert });
    } catch (error) {
        console.error('Erreur lors de la récupération du panier concert :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updatePanierConcert = async (req, res) => {
    const uuid = req.params.uuid;
    const {} = req.body;
    const resultat = await panierConcertService.updatePanierConcert(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTRÉE");
};

exports.deletePanierConcert = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await panierConcertService.deletePanierConcert(uuid);
        if (!result) {
            return res.status(200).json({ message: 'Panier supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Panier non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du panier concert :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
