const express = require("express");
const ReservConcertController = require("../controllers/reservConcert.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.post("/",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.saveReservationConcert);
router.get("/", ReservConcertController.getReservConcert);
router.get("/:uuid", ReservConcertController.getReservConcertById);
router.put("/:id",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.updateReservConcert);
router.delete("/:id",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.deleteReservConcert);

module.exports = router;