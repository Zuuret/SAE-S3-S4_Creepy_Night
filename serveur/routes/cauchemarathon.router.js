const express = require("express");
const router = express.Router();
const cauchemarathonController = require("../controllers/cauchemarathon.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

router.post("/buyTicket", sessionMiddleware.authVerif([1]), cauchemarathonController.buyTicket);

module.exports = router;
