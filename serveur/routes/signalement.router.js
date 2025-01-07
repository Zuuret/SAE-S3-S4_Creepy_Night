const express = require("express");
const signalementController = require('../controllers/signalement.controller');
//const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/signalement:
 *   post:
 *     summary: Signaler un incident et alerter les organisateurs responsables
 *     description: Permet de signaler un incident dans une zone spécifique et alerte les organisateurs responsables.
 *     tags:
 *       - signalement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - utilisateurId
 *               - typeIncident
 *               - description
 *               - zoneId
 *               - position
 *             properties:
 *               utilisateurId:
 *                 type: string
 *                 format: uuid
 *                 maxLength: 128
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               typeIncident:
 *                 type: string
 *                 maxLength: 128
 *                 example: Incendie
 *               description:
 *                 type: string
 *                 maxLength: 256
 *                 example: un incendie a été signalé près du stand de nourriture
 *               zoneId:
 *                 type: integer
 *                 example: 1
 *               position:
 *                 type: string
 *                 maxLength: 256
 *                 example: zone 1, près du stand de nourriture
 *     responses:
 *       '200':
 *         description: Signalement ajouté et organisateurs notifiés avec succès
 *       '400':
 *         description: Paramètres manquants ou invalides dans la requête
 *       '404':
 *         description: Zone ou organisateur non trouvé
 *       '500':
 *         description: Erreur interne du serveur lors du signalement de l'incident
 */
router.post("/", signalementController.signalerIncident);

module.exports = router;
