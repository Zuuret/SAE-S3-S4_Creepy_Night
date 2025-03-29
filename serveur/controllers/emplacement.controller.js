const emplacementService = require("../services/emplacement.services.pg");

exports.getEmplacement = async (req, res) => {
    const emplacements = await emplacementService.getEmplacement();
        if (!emplacements || emplacements.length === 0) {
            return res.status(500).json({ error: 'Aucun emplacement trouvé' });
        }
        return res.status(200).json({ data: emplacements });
};

exports.updateEmplacement = async (req, res) => {
    const nom = req.body.nom;
    const coord_x = req.body.coord_x;
    const coord_y = req.body.coord_y;
    const prestataire_id = req.body.prestataire_id;
    const icone_id = req.body.icone_id;

    const resultat = await emplacementService.updateEmplacement(nom, coord_x, coord_y, prestataire_id, icone_id);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};