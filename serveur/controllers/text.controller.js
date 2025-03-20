const textService = require("../services/texte_accueil.service.pg");

exports.getTexteAccueil = async (req, res) => {
    const textes = await textService.getTexteAccueil();
    if (!textes) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: textes });
};

exports.updateTexteAccueil = async (req, res) => {
    const titre = req.body.titre;
    const contenu = req.body.contenu;

    const resultat = await textService.updateTexteAccueil(titre, contenu);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};
