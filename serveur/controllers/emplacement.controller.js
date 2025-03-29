const emplacementService = require("../services/emplacement.services.pg");

exports.getEmplacement = async (req, res) => {
    const emplacements = await emplacementService.getEmplacement();
        if (!emplacements || emplacements.length === 0) {
            return res.status(500).json({ error: 'Aucun emplacement trouvé' });
        }
        return res.status(200).json({ data: emplacements });
};

exports.updateEmplacement = async (req, res) => {
    const { id, nom, coord_x, coord_y, prestataire_id, icone_id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID de l\'emplacement manquant' });
    }

    const resultat = await emplacementService.updateEmplacement(id, nom, coord_x, coord_y, prestataire_id, icone_id);
    if (resultat) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ message: 'MODIFICATION ENREGISTREE' });
};