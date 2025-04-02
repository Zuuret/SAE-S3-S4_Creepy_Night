const express = require("express");
const demandesOrganisateursController = require("../controllers/demandesOrganisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.saveDemandeOrganisateurs);


router.get("/",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.getDemandesOrganisateurs);


router.get("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.getDemandeOrganisateursById);


router.put("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.updateDemandeOrganisateurs);


router.delete("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.deleteDemandeOrganisateurs);

module.exports = router;