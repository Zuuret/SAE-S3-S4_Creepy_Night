const articlesService = require("../services/articles.service.pg");

exports.getAllArticlesById = async (req, res) => {
    const idPrestataire = req.params.idPrestataire;
    try {
        const articles = await articlesService.getAllArticlesById(idPrestataire);
        if (!articles || articles.length === 0) {
            return res.status(404).json({ error: "Aucun article trouvé pour ce prestataire" });
        }
        return res.status(200).json({data: articles, error: 0});
    } catch (error) {
        console.error("Erreur dans le contrôleur getAllArticlesById :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
