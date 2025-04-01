const express = require("express");
const router = express.Router();
const cashlessController = require("../controllers/cashless.controller");

// Endpoint pour mettre à jour les fonds (Rechargement / Remboursement)
router.put("/updateFunds", cashlessController.updateFunds);

// Route pour vérifier les coordonnées bancaires
router.post("/checkBankCard", cashlessController.checkBankCard);

module.exports = router;
