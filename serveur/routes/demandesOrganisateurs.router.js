const express = require("express");
const demandesOrganisateursController = require("../controllers/demandesOrganisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", demandesOrganisateursController.saveDemandeOrganisateurs);


router.get("/", demandesOrganisateursController.getDemandesOrganisateurs);


router.get("/:uuid", demandesOrganisateursController.getDemandeOrganisateursById);


router.put("/:uuid", sessionMiddleware.checkSession, demandesOrganisateursController.updateDemandeOrganisateurs);


router.delete("/:uuid", sessionMiddleware.checkSession, demandesOrganisateursController.deleteDemandeOrganisateurs);

module.exports = router;