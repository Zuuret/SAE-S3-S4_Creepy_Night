const express = require("express");
const organisateursController = require("../controllers/organisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", organisateursController.saveOrganisateur);


router.get("/", organisateursController.getOrganisateurs);


router.get("/:uuid", organisateursController.getOrganisateurById);


router.put("/:uuid", sessionMiddleware.checkSession, organisateursController.updateOrganisateur);


router.delete("/:uuid", sessionMiddleware.checkSession, organisateursController.deleteOrganisateur);

module.exports = router;