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

exports.getArticleById = async (req, res) => {
    const idArticle = req.params.idArticle;
    try {
        const article = await articlesService.getArticleById(idArticle);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        return res.status(200).json({ data: article[0], error: 0 });
    } catch (error) {
        console.error("Erreur dans le contrôleur getArticleById :", error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

exports.saveArticleToCart = async (req, res) => {
    const { article, utilisateur_id } = req.body;
    try {
        const result = await articlesService.saveArticleToCart(article, utilisateur_id);
        if (!result) {
            return res.status(500).json({ error: 1, data: "Erreur lors de l'ajout au panier" });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans saveArticleToCart :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};

exports.getCart = async (req, res) => {
    const { idUtilisateur } = req.params;
    try {
        const result = await articlesService.getCart(idUtilisateur);
        if (!result) {
            return res.status(500).json({ error: 1, data: "Erreur lors de la récupération du panier" });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans getCart :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
}

exports.incrementArticleInCart = async (req, res) => {
    const { cart_item_id } = req.body; // On attend que le front envoie l'id de la ligne du panier
    try {
        const result = await articlesService.incrementArticleInCart(cart_item_id);
        if (result.error) {
            return res.status(400).json({ error: 1, data: result.error });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans incrementArticleInCart :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};

exports.decrementArticleInCart = async (req, res) => {
    const { cart_item_id } = req.body; // On attend que le front envoie l'id de la ligne du panier
    try {
        const result = await articlesService.decrementArticleInCart(cart_item_id);
        if (result.error) {
            return res.status(400).json({ error: 1, data: result.error });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans decrementArticleInCart :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};
