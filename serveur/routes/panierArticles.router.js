const express = require("express");
const router = express.Router();
const panierArticleController = require("../controllers/panierArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


router.post("/",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.savePanierArticles);


router.get("/", panierArticleController.getPanierArticles);


router.get("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.getPanierArticleById);


router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.updatePanierArticles);


router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.deletePanierArticles);

module.exports = router;
