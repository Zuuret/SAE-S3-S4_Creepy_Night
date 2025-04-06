const express = require("express");
const router = express.Router();
const reservationArticleController = require("../controllers/reservationArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

router.post("/",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.saveReservationArticles);

/**
 * @swagger
 * /api/reservationsArticles/save:
 *   post:
 *     summary: Enregistrer une réservation d'article depuis le panier
 *     description: Convertit le contenu du panier (table "panier_article") en réservations d'articles (table "reservation_article") pour l'utilisateur spécifié. Pour chaque article dans le panier, une réservation est créée avec la quantité correspondante et la date de réservation (NOW()). Le total des prix est calculé, le solde de l'utilisateur (table "utilisateur") est mis à jour, une transaction est enregistrée dans la table "Transaction", et le panier est vidé.
 *     tags:
 *       - Réservations Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: reservationData
 *         description: Données nécessaires pour transformer le panier en réservations.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - utilisateur_id
 *           properties:
 *             utilisateur_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur effectuant la réservation (correspond à Utilisateur.id).
 *               example: "5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6"
 *     responses:
 *       '200':
 *         description: Réservations créées avec succès, solde mis à jour et transaction enregistrée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservations:
 *                   type: array
 *                   description: Liste des réservations d'articles créées.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       utilisateur_id:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       article_id:
 *                         type: number
 *                         example: 10
 *                       quantite:
 *                         type: number
 *                         example: 2
 *                       date_reservation:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-01T20:00:00Z"
 *                 solde:
 *                   type: number
 *                   format: float
 *                   description: Nouveau solde de l'utilisateur après la réservation.
 *                   example: 150.00
 *                 transaction:
 *                   type: object
 *                   description: Détails de la transaction enregistrée.
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 5
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-11-01T20:00:00Z"
 *                     operation:
 *                       type: string
 *                       example: "Commande - Prestataire(s)"
 *                     details:
 *                       type: string
 *                       example: "Réservation de commande d'une valeur de 50 €"
 *                     montant:
 *                       type: number
 *                       format: float
 *                       example: -50.00
 *       '400':
 *         description: Erreur de validation – panier vide ou solde insuffisant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Panier vide"
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/save",  sessionMiddleware.authVerif([1]), reservationArticleController.saveReservationArticle);

router.get("/",  reservationArticleController.getReservationArticles);


router.get("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.getReservationArticleById);


router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.updateReservationArticles);


router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), reservationArticleController.deleteReservationArticles);

module.exports = router;
