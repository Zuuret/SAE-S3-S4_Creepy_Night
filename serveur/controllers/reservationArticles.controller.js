const { v4: uuidv4 } = require('uuid');
const reservationArticlesService = require("../services/reservationArticles.services.pg");

exports.saveReservationArticles = async (req, res) => {
    const uuid = uuidv4();
    const {} = req.body;
    const resultat = await reservationArticlesService.insertReservationArticles(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getReservationArticles = async (req, res) => {
    const reservationArticles = await reservationArticlesService.getReservationArticles();
    if (!reservationArticles) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: reservationArticles });
};

exports.getReservationArticleById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const reservationArticles = await reservationArticlesService.getReservationArticles();
        const reservationArticle = reservationArticles.find(u => u.id == uuid);
        if (!reservationArticle) {
            return res.status(404).json({ error: 'Réservation article non trouvée' });
        }
        return res.status(200).json({ data: reservationArticle });
    } catch (error) {
        console.error('Erreur lors de la récupération de la réservation article :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateReservationArticles = async (req, res) => {
    const uuid = req.params.uuid;
    const {} = req.body;
    const resultat = await reservationArticlesService.updateReservationArticles(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTRÉE");
};

exports.deleteReservationArticles = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await reservationArticlesService.deleteReservationArticles(uuid);
        if (!result) {
            return res.status(200).json({ message: 'Réservation article supprimée avec succès' });
        } else {
            return res.status(404).json({ message: 'Réservation article non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation article :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.saveReservationArticle = async (req, res) => {
    const idUser = req.body.idUser;
    try {
        const reservations = await reservationArticlesService.insertReservationArticle(idUser);
        if (reservations.error) {
            return res.status(500).json({ error: 1, data: reservations.error });
        }
        return res.status(200).json({ error: 0, data: reservations });
    } catch (error) {
        console.error("Erreur dans saveReservationArticle :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};