const express = require("express");
const demandesOrganisateursController = require("../controllers/demandesOrganisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", sessionMiddleware.authVerif, demandesOrganisateursController.saveDemandeOrganisateurs);


router.get("/", sessionMiddleware.authVerif, demandesOrganisateursController.getDemandesOrganisateurs);


router.get("/:uuid", sessionMiddleware.authVerif, demandesOrganisateursController.getDemandeOrganisateursById);


router.put("/:uuid", sessionMiddleware.authVerif, demandesOrganisateursController.updateDemandeOrganisateurs);


router.delete("/:uuid", sessionMiddleware.authVerif, demandesOrganisateursController.deleteDemandeOrganisateurs);

module.exports = router;