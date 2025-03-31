const express = require("express");
const router = express.Router();
const panierArticleController = require("../controllers/panierArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


router.post("/", sessionMiddleware.authVerif, panierArticleController.savePanierArticles);


router.get("/", panierArticleController.getPanierArticles);


router.get("/:uuid", sessionMiddleware.authVerif, panierArticleController.getPanierArticleById);


router.put("/:uuid", sessionMiddleware.authVerif, panierArticleController.updatePanierArticles);


router.delete("/:uuid", sessionMiddleware.authVerif, panierArticleController.deletePanierArticles);

module.exports = router;
