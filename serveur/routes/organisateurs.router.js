const express = require("express");
const organisateursController = require("../controllers/organisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();


router.post("/", organisateursController.saveOrganisateur);


router.get("/", organisateursController.getOrganisateurs);


router.get("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.getOrganisateurById);


router.put("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.updateOrganisateur);


router.delete("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.deleteOrganisateur);

module.exports = router;