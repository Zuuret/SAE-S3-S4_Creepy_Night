const express = require("express");
const emplacementController = require("../controllers/emplacement.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.get("/", emplacementController.getEmplacement);

router.put("/", sessionMiddleware.authVerif, emplacementController.updateEmplacement);

module.exports = router;