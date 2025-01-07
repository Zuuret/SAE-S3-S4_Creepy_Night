const express = require("express");
const acheterBilletController = require("../controllers/achat_billet.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/achat:
 *   post:
 *     summary: Acheter un billet pour une activité
 *     description: Permet à un utilisateur d'acheter un billet pour une activité donnée
 *     tags:
 *       - Billets
 *     parameters:
 *       - in: body
 *         name: achat
 *         description: Données pour acheter un billet
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             utilisateurId:
 *               type: string
 *               format: uuid
 *               description: L'identifiant unique de l'utilisateur
 *               required: true
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             activiteId:
 *               type: integer
 *               description: L'identifiant unique de l'activité
 *               required: true
 *               example: 1
 *     responses:
 *       '200':
 *         description: Billet acheté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Billet acheté avec succès."
 *       '400':
 *         description: Erreur de validation ou de demande incorrecte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Solde insuffisant"
 *       '404':
 *         description: Activité ou utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Activité non trouvée"
 *       '500':
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de l'achat du billet"
 */
router.post("/", sessionMiddleware.checkSession, acheterBilletController.acheterBillet);

module.exports = router;
