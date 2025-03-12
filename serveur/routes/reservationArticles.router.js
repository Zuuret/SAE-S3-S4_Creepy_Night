const express = require("express");
const router = express.Router();
const reservationArticleController = require("../controllers/reservationArticle.controller");

router.post("/", reservationArticleController.saveReservationArticle);


router.get("/", reservationArticleController.getReservationArticle);


router.get("/:uuid", reservationArticleController.getReservationArticleById);


router.put("/:uuid", reservationArticleController.updateReservationArticle);


router.delete("/:uuid", reservationArticleController.deleteReservationArticle);

module.exports = router;
