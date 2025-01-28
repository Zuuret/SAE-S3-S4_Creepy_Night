const express = require("express");
const demandePrestatairesController = require("../controllers/demandePrestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", demandePrestatairesController.saveDemandePrestataire);


router.get("/", demandePrestatairesController.getDemandesPrestataires);


router.get("/:uuid", demandePrestatairesController.getDemandePrestataireById);


router.put("/:uuid", sessionMiddleware.checkSession, demandePrestatairesController.updateDemandePrestataire);


router.delete("/:uuid", sessionMiddleware.checkSession, demandePrestatairesController.deleteDemandePrestataire);

module.exports = router;