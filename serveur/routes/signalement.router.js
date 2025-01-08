const express = require("express");
const signalementController = require('../controllers/signalement.controller');

const router = express.Router();

/**
 * @swagger
 * /api/signalement:
 *   post:
 *     summary: Créer un nouveau signalement
 *     description: Utilisé pour créer un nouveau signalement
 *     tags:
 *       - signalement
 *     parameters:
 *       - in: body
 *         name: signalement
 *         description: Données du signalement
 *         schema:
 *           type: object
 *           required:
 *             - utilisateurId
 *             - typeIncident
 *             - description
 *             - zoneId
 *             - position
 *           properties:
 *               utilisateurId:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               typeIncident:
 *                 type: string
 *                 example: Incendie
 *               description:
 *                 type: string
 *                 example: Un incendie a été signalé près du stand de nourriture
 *               zoneId:
 *                 type: integer
 *                 example: 1
 *               position:
 *                 type: string
 *                 example: Zone 1, près du stand de nourriture
 *     responses:
 *       200:
 *         description: Signalement ajouté et organisateurs notifiés avec succès
 *       400:
 *         description: Paramètres manquants ou invalides dans la requête
 *       404:
 *         description: Zone ou organisateurs non trouvés
 *       500:
 *         description: Erreur interne lors du signalement de l'incident
 */
router.post("/", signalementController.signalerIncident);

module.exports = router;
