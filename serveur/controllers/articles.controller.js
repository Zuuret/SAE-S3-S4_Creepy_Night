const articlesService = require("../services/articles.service.pg");

exports.getAllArticlesById = async (req, res) => {
    const idPrestataire = req.params.idPrestataire;
    try {
        const articles = await articlesService.getAllArticlesById(idPrestataire);
        if (!articles || articles.length === 0) {
            return res.status(200).json({ data: [], error: 0 });
        }
        return res.status(200).json({ data: articles, error: 0 });
    } catch (error) {
        console.error("Erreur dans le contrôleur getAllArticlesById :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

exports.getAllArticles = async (req, res) => {
    const articles = await articlesService.getAllArticles();
    if (!articles) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: articles, error: 0 });
};

exports.saveArticle = async (req,res) => {
    const prestataire_id = req.body.prestataire_id;
    const nom = req.body.nom;
    const description = req.body.description;
    const prix = req.body.prix;
    const stock = req.body.stock;
    const image = req.body.image;
    const resultat = await articlesService.insertArticle(prestataire_id, nom, description, prix, stock, image);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    console.log("INSERTION AVEC SUCCES")
    return res.status(200).json({ message: 'Article créé', error: 0 });
};

exports.updateArticle = async (req,res) => {
    const id = req.body.id;
    const prestataire_id = req.body.prestataire_id;
    const nom = req.body.nom;
    const description = req.body.description;
    const prix = req.body.prix;
    const stock = req.body.stock;
    const image = req.body.image;
    const resultat = await articlesService.updateArticle(id, prestataire_id, nom, description, prix, stock, image);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    console.log("MODIFICATION ENREGISTREE")
    return res.status(200).json({ message: 'Article modifié', error: 0 });
};

exports.deleteArticle = async (req, res) => {
    let id = req.params.idPresta
    try {
        const result = await articlesService.deleteArticle(id);

        if (!result) {
            return res.status(200).json({ message: 'Article supprimé avec succès', error: 0 });
        } else {
            return res.status(404).json({ error: 'Article non trouvé' });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression d'article:", error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
