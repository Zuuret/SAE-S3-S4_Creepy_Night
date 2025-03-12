const express = require("express");
const router = express.Router();
const panierConcertController = require("../controllers/panier_concerts.controller");


router.post("/", panierConcertController.savePanierConcert);


router.get("/", panierConcertController.getPanierConcerts);


router.get("/:uuid", panierConcertController.getPanierConcertById);


router.put("/:uuid", panierConcertController.updatePanierConcert);


router.delete("/:uuid", panierConcertController.deletePanierConcert);

module.exports = router;
