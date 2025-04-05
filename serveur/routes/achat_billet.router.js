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
router.post("/",  sessionMiddleware.authVerif([1,2,3]), acheterBilletController.acheterBillet);

/**
 * @swagger
 * /api/achat:
 *   get:
 *     summary: Récupérer les billets du festival
 *     description: Permet de récupérer la liste de tous les billets achetés pour le festival.
 *     tags:
 *       - Billets
 *     responses:
 *       '200':
 *         description: Liste des billets récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identifiant du billet (généré automatiquement)
 *                     example: 1
 *                   date_achat:
 *                     type: string
 *                     format: date-time
 *                     description: Date d'achat du billet
 *                   evenement_id:
 *                     type: integer
 *                     description: Identifiant de l'événement associé
 *                     example: 1
 *                   utilisateur_id:
 *                     type: string
 *                     format: uuid
 *                     description: Identifiant de l'utilisateur ayant acheté le billet
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *       '500':
 *         description: Erreur interne du serveur lors de la récupération des billets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des billets"
 */
router.get("/", acheterBilletController.getBilletsFestival);

module.exports = router;
