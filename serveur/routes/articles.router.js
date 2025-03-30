const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");


// Route pour récupérer tous les articles d’un prestataire donné
router.get("/prestataire/:idPrestataire", articlesController.getAllArticlesById);

module.exports = router;
