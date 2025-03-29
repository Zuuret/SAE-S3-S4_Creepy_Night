const express = require("express");
const iconeCarteController = require("../controllers/iconeCarte.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.get("/", iconeCarteController.getIcone);

module.exports = router;