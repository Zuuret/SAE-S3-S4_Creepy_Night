const express = require("express");
const placeFilmsController = require("../controllers/placeFilms.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

router.post("/", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.savePlaceFilm);


router.get("/:idFilm", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.getPlaceFilms);


router.delete("/:id", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.deletePlaceFilm);

module.exports = router;
