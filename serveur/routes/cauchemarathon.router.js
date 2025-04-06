const express = require("express");
const router = express.Router();
const cauchemarathonController = require("../controllers/cauchemarathon.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

/**
 * @swagger
 * /api/cauchemarathon/buyTicket:
 *   post:
 *     summary: Acheter des billets pour le Cauchemarathon
 *     description: Permet à un utilisateur d'acheter des billets pour le Cauchemarathon. Cette opération vérifie le solde de l'utilisateur, met à jour le nombre de places disponibles pour la course, enregistre la réservation et la transaction correspondante.
 *     tags:
 *       - Cauchemarathon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: reservation
 *         description: Données pour l'achat des billets
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - idUser
 *             - nbBillets
 *             - price
 *             - dateCourse
 *             - nomCourse
 *           properties:
 *             idUser:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur effectuant la réservation (Utilisateur.id)
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             nbBillets:
 *               type: integer
 *               description: Nombre de billets à acheter
 *               example: 2
 *             price:
 *               type: number
 *               format: float
 *               description: Prix total du ou des billets
 *               example: 30.00
 *             dateCourse:
 *               type: string
 *               format: date
 *               description: Date de la course
 *               example: "2025-06-15"
 *             nomCourse:
 *               type: string
 *               description: Nom de la course
 *               example: "Le CrainTour"
 *     responses:
 *       '200':
 *         description: Billets achetés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 reservation:
 *                   type: object
 *                   description: Détails de la réservation effectuée
 *                 solde:
 *                   type: number
 *                   description: Nouveau solde de l'utilisateur
 *                 transaction:
 *                   type: object
 *                   description: Détails de la transaction enregistrée
 *       '400':
 *         description: Erreur lors de l'achat (solde insuffisant, places indisponibles, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "Solde insuffisant"
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/buyTicket", sessionMiddleware.authVerif([1]), cauchemarathonController.buyTicket);

module.exports = router;
