const iconeCarteService = require("../services/icone_carte.services.pg");

exports.getIcone = async (req, res) => {
    const icones = await iconeCarteService.getIcone();
    if (!icones || icones.length === 0) {
        return res.status(500).json({ error: 'Aucune icône trouvée' });
    }
    return res.status(200).json({ data: icones });
};
