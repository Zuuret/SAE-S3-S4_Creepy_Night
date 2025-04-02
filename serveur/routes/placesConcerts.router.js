const express = require("express");
const router = express.Router();
const placesConcertsController = require("../controllers/placesConcerts.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


router.post("/",  sessionMiddleware.authVerif([1,2,3]), placesConcertsController.savePlacesConcerts);


router.get("/", placesConcertsController.getPlacesConcerts);


router.get("/:uuid", placesConcertsController.getPlacesConcertsById);


router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), placesConcertsController.updatePlacesConcerts);


router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), placesConcertsController.deletePlacesConcerts);

module.exports = router;
