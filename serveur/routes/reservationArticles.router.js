const express = require("express");
const router = express.Router();
const reservationArticleController = require("../controllers/reservationArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

router.post("/",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.saveReservationArticles);

router.post("/save",  sessionMiddleware.authVerif([1]), reservationArticleController.saveReservationArticle);

router.get("/",  reservationArticleController.getReservationArticles);


router.get("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.getReservationArticleById);


router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.updateReservationArticles);


router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.deleteReservationArticles);

module.exports = router;
