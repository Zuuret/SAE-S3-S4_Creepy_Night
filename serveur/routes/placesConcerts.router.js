const express = require("express");
const router = express.Router();
const placesConcertsController = require("../controllers/placesConcerts.controller");


router.post("/", placesConcertsController.savePlacesConcerts);


router.get("/", placesConcertsController.getPlacesConcerts);


router.get("/:uuid", placesConcertsController.getPlacesConcertsById);


router.put("/:uuid", placesConcertsController.updatePlacesConcerts);


router.delete("/:uuid", placesConcertsController.deletePlacesConcerts);

module.exports = router;
