const express = require("express");
const router = express.Router();
const livreDOrController = require("../controllers/livreDOr.controller");


router.post("/", livreDOrController.saveLivreDOr);


router.get("/", livreDOrController.getLivreDOr);


router.get("/:uuid", livreDOrController.getLivreDOrById);


router.put("/:uuid", livreDOrController.updateLivreDOr);


router.delete("/:uuid", livreDOrController.deleteLivreDOr);

module.exports = router;
