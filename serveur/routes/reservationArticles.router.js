const express = require("express");
const router = express.Router();
const reservationArticleController = require("../controllers/reservationArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

router.post("/",  sessionMiddleware.authVerif(), reservationArticleController.saveReservationArticles);


router.get("/", reservationArticleController.getReservationArticles);


router.get("/:uuid",  sessionMiddleware.authVerif(), reservationArticleController.getReservationArticleById);


router.put("/:uuid",  sessionMiddleware.authVerif(), reservationArticleController.updateReservationArticles);


router.delete("/:uuid",  sessionMiddleware.authVerif(), reservationArticleController.deleteReservationArticles);

module.exports = router;
