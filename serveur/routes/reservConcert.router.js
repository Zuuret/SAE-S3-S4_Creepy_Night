const express = require("express");
const ReservConcertController = require("../controllers/reservConcert.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.post("/",  sessionMiddleware.authVerif(), ReservConcertController.saveReservConcert);
router.get("/", ReservConcertController.getReservConcert);
router.get("/:uuid", ReservConcertController.getReservConcertById);
router.put("/:id",  sessionMiddleware.authVerif(), ReservConcertController.updateReservConcert);
router.delete("/:id",  sessionMiddleware.authVerif(), ReservConcertController.deleteReservConcert);

module.exports = router;