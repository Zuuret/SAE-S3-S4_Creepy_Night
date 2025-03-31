const express = require("express");
const demandesPrestatairesController = require("../controllers/demandesPrestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", sessionMiddleware.authVerif, demandesPrestatairesController.saveDemandePrestataire);


router.get("/", sessionMiddleware.authVerif, demandesPrestatairesController.getDemandesPrestataires);


router.get("/:uuid", sessionMiddleware.authVerif, demandesPrestatairesController.getDemandePrestataireById);


router.put("/:uuid", sessionMiddleware.authVerif, demandesPrestatairesController.updateDemandePrestataire);


router.delete("/:uuid", sessionMiddleware.authVerif, demandesPrestatairesController.deleteDemandePrestataire);

module.exports = router;