const express = require("express");
const router = express.Router();
const panierArticleController = require("../controllers/panierArticle.controller");


router.post("/", panierArticleController.savePanierArticle);


router.get("/", panierArticleController.getPanierArticle);


router.get("/:uuid", panierArticleController.getPanierArticleById);


router.put("/:uuid", panierArticleController.updatePanierArticle);


router.delete("/:uuid", panierArticleController.deletePanierArticle);

module.exports = router;
