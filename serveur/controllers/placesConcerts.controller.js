const { v4: uuidv4 } = require('uuid');
const placesConcertsService = require("../services/placesConcerts.services.pg");

exports.savePlacesConcerts = async (req, res) => {
    const uuid = uuidv4();
    const {} = req.body;
    const resultat = await placesConcertsService.insertPlacesConcerts(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getPlacesConcerts = async (req, res) => {
    const placesConcerts = await placesConcertsService.getPlacesConcerts();
    if (!placesConcerts) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: placesConcerts });
};

exports.getPlacesConcertsById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const placesConcerts = await placesConcertsService.getPlacesConcerts();
        const placeConcert = placesConcerts.find(u => u.id == uuid);
        if (!placeConcert) {
            return res.status(404).json({ error: 'Place de concert non trouvée' });
        }
        return res.status(200).json({ data: placeConcert });
    } catch (error) {
        console.error('Erreur lors de la récupération de la place de concert :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updatePlacesConcerts = async (req, res) => {
    const uuid = req.params.uuid;
    const {} = req.body;
    const resultat = await placesConcertsService.updatePlacesConcerts(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTRÉE");
};

exports.deletePlacesConcerts = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await placesConcertsService.deletePlacesConcerts(uuid);
        if (!result) {
            return res.status(200).json({ message: 'Place de concert supprimée avec succès' });
        } else {
            return res.status(404).json({ message: 'Place de concert non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la place de concert :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
