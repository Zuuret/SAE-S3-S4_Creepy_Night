const express = require("express");
const demandesPrestatairesController = require("../controllers/demandesPrestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", demandesPrestatairesController.saveDemandePrestataire);


router.get("/", demandesPrestatairesController.getDemandesPrestataires);


router.get("/:uuid", demandesPrestatairesController.getDemandePrestataireById);


router.put("/:uuid", sessionMiddleware.checkSession, demandesPrestatairesController.updateDemandePrestataire);


router.delete("/:uuid", sessionMiddleware.checkSession, demandesPrestatairesController.deleteDemandePrestataire);

module.exports = router;