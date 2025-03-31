const express = require("express");
const router = express.Router();
const panierConcertController = require("../controllers/panierConcerts.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


router.post("/", sessionMiddleware.authVerif, panierConcertController.savePanierConcerts);


router.get("/", panierConcertController.getPanierConcerts);


router.get("/:uuid", sessionMiddleware.authVerif, panierConcertController.getPanierConcertById);


router.put("/:uuid", sessionMiddleware.authVerif, panierConcertController.updatePanierConcert);


router.delete("/:uuid", sessionMiddleware.authVerif, panierConcertController.deletePanierConcert);

module.exports = router;
