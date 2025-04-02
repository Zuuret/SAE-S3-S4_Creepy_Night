const express = require("express");
const demandesPrestatairesController = require("../controllers/demandesPrestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/",  sessionMiddleware.authVerif(), demandesPrestatairesController.saveDemandePrestataire);


router.get("/",  sessionMiddleware.authVerif(), demandesPrestatairesController.getDemandesPrestataires);


router.get("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.getDemandePrestataireById);


router.put("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.updateDemandePrestataire);


router.delete("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.deleteDemandePrestataire);

module.exports = router;