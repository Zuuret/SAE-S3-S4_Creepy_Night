const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


// Route pour récupérer tous les articles d’un prestataire donné

router.get("/prestataire/:idPrestataire", articlesController.getAllArticlesById);

router.get("/prestataire", articlesController.getAllArticles);

router.post("/prestataire", sessionMiddleware.authVerif(), articlesController.saveArticle);

router.put("/prestataire", sessionMiddleware.authVerif(), articlesController.updateArticle);

router.delete("/prestataire", sessionMiddleware.authVerif(), articlesController.deleteArticle);

module.exports = router;
