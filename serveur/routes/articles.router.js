const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


// Route pour récupérer tous les articles d’un prestataire donné

router.get("/prestataire/:idPrestataire", articlesController.getAllArticlesById);

router.get("/prestataire", articlesController.getAllArticles);

router.post("/prestataire", sessionMiddleware.authVerif([2]), articlesController.saveArticle);

router.put("/prestataire", sessionMiddleware.authVerif([2]), articlesController.updateArticle);

router.delete("/prestataire/:idPresta", sessionMiddleware.authVerif([2]), articlesController.deleteArticle);

router.get("/prestataire/article/:idArticle", articlesController.getArticleById);

router.post("/cart", sessionMiddleware.authVerif(), articlesController.saveArticleToCart);

router.get("/cart/:idUtilisateur", sessionMiddleware.authVerif(), articlesController.getCart);

router.put("/cart/increment", sessionMiddleware.authVerif(), articlesController.incrementArticleInCart);

router.put("/cart/decrement", sessionMiddleware.authVerif(), articlesController.decrementArticleInCart);

module.exports = router;
