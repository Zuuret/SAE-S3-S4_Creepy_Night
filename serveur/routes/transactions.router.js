const express = require("express");
const transactionsController = require("../controllers/transactions.controller");

const router = express.Router();

/**
 * @swagger
 * /api/transactions/{utilisateurId}:
 *   get:
 *     summary: Consulter l’historique des transactions d’un utilisateur
 *     description: Affiche les transactions d’un utilisateur avec le détail des activités, prestations ou billets associés.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: utilisateurId
 *         required: true
 *         description: L'identifiant unique de l'utilisateur
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Historique des transactions récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       transactionId:
 *                         type: string
 *                         description: L'identifiant de la transaction
 *                         example: "abc123"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: La date de la transaction
 *                         example: "2025-01-07T12:00:00Z"
 *                       montant:
 *                         type: number
 *                         description: Le montant de la transaction
 *                         example: 50.00
 *                       categorie:
 *                         type: string
 *                         description: La catégorie de la transaction (activités, prestations, festivals)
 *                         example: "Activité"
 *                       details:
 *                         type: object
 *                         properties:
 *                           activite:
 *                             type: string
 *                             description: L'activité associée à la transaction
 *                             example: "Concert de rock"
 *                           prestation:
 *                             type: string
 *                             description: La prestation associée à la transaction
 *                             example: "Place VIP"
 *       '404':
 *         description: Utilisateur non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des transactions"
 */
router.get("/:utilisateurId", transactionsController.consulterHistorique);

module.exports = router;
