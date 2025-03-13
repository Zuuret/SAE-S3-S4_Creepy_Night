const { v4: uuidv4 } = require('uuid');
const panierArticlesService = require("../services/panierArticles.services.pg");

exports.savePanierArticles = async (req, res) => {
    const uuid = uuidv4();
    const {} = req.body;
    const resultat = await panierArticlesService.insertPanierArticles(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCÈS");
};

exports.getPanierArticles = async (req, res) => {
    const panierArticles = await panierArticlesService.getPanierArticles();
    if (!panierArticles) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: panierArticles });
};

exports.getPanierArticleById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const panierArticles = await panierArticlesService.getPanierArticles();
        const panierArticle = panierArticles.find(u => u.id == uuid);
        if (!panierArticle) {
            return res.status(404).json({ error: 'Panier article non trouvé' });
        }
        return res.status(200).json({ data: panierArticle });
    } catch (error) {
        console.error('Erreur lors de la récupération du panier article :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updatePanierArticles = async (req, res) => {
    const uuid = req.params.uuid;
    const {} = req.body;
    const resultat = await panierArticlesService.updatePanierArticle(uuid, );
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTRÉE");
};

exports.deletePanierArticles = async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await panierArticlesService.deletePanierArticles(uuid);
        if (!result) {
            return res.status(200).json({ message: 'Panier article supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Panier article non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du panier article :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
