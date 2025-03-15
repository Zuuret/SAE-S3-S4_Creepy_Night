const livreDOrService = require("../services/livreDOr.services.pg");

exports.saveLivreDOr = async (req, res) => {
    const prestataire_id = req.params.prestataire_id;
    const nom_utilisateur = req.body.nom_utilisateur;
    const evaluation = req.body.evaluation;
    const message = req.body.message;
    const date = req.body.date;
    const resultat = await livreDOrService.insertLivreDOr(prestataire_id, nom_utilisateur, evaluation, message, date);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getAllLivreDOr = async (req, res) => {
    const livreDOr = await livreDOrService.getAllLivreDOr();
    if (!livreDOr) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: livreDOr });
};

exports.getLivreDOrById = async (req, res) => {
    const prestataire_id = req.params.prestataire_id;
    const livreDOrSpecifique = await livreDOrService.getLivreDOrById(prestataire_id);
    if (!livreDOrSpecifique) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: livreDOrSpecifique });
};

exports.deleteCommentaire = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await livreDOrService.deleteCommentaire(id);
        if (!result) {
            return res.status(200).json({ message: 'Commentaire supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
