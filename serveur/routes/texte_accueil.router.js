const express = require("express");
const textController = require("../controllers/text.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.get("/", textController.getTexteAccueil);

router.put("/",  sessionMiddleware.authVerif([3]), textController.updateTexteAccueil);

module.exports = router;