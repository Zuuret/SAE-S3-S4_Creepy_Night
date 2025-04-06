const express = require("express");
const ReservConcertController = require("../controllers/reservConcert.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/reservConcert:
 *   post:
 *     summary: Enregistrer une réservation de concert
 *     description: Permet à un utilisateur authentifié (rôles [1,2,3]) de réserver des places pour un concert. L'opération vérifie le stock disponible dans "Concert", décrémente le nombre de places, insère la réservation dans "reservation_concert", enregistre une transaction dans "Transaction" et met à jour le solde de l'utilisateur.
 *     tags:
 *       - Réservation Concert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: reservationConcert
 *         description: Données de la réservation pour un concert
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - utilisateur_id
 *             - concert_id
 *             - nb_places
 *             - date_reservation
 *           properties:
 *             id:
 *               type: string
 *               description: Identifiant unique de la réservation (fourni par le client ou généré)
 *               example: "abc123"
 *             utilisateur_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur (Utilisateur.id)
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             concert_id:
 *               type: number
 *               description: Identifiant du concert (Concert.id)
 *               example: 3
 *             nb_places:
 *               type: number
 *               description: Nombre de places à réserver
 *               example: 2
 *             date_reservation:
 *               type: string
 *               format: date-time
 *               description: Date et heure de la réservation
 *               example: "2025-11-01T20:00:00Z"
 *     responses:
 *       '200':
 *         description: Réservation de concert enregistrée avec succès.
 *       '400':
 *         description: Erreur (concert non trouvé, places insuffisantes, ou solde insuffisant).
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.saveReservationConcert);

/**
 * @swagger
 * /api/reservConcert:
 *   get:
 *     summary: Récupérer toutes les réservations de concerts
 *     description: Retourne la liste de toutes les réservations enregistrées dans "reservation_concert".
 *     tags:
 *       - Réservation Concert
 *     responses:
 *       '200':
 *         description: Liste des réservations récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", ReservConcertController.getReservConcert);

/**
 * @swagger
 * /api/reservConcert/{uuid}:
 *   get:
 *     summary: Récupérer une réservation de concert par UUID
 *     description: Retourne une réservation de concert spécifique identifiée par son UUID.
 *     tags:
 *       - Réservation Concert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de la réservation (reservation_concert.id)
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       '200':
 *         description: Réservation récupérée avec succès.
 *       '404':
 *         description: Réservation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid", ReservConcertController.getReservConcertById);

/**
 * @swagger
 * /api/reservConcert/{id}:
 *   put:
 *     summary: Mettre à jour une réservation de concert
 *     description: Permet de modifier une réservation de concert (ex. nombre de places ou date) pour un identifiant donné. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Réservation Concert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation à mettre à jour
 *         schema:
 *           type: number
 *           example: 1
 *       - in: body
 *         name: reservationConcert
 *         description: Données de la réservation à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nb_places:
 *               type: number
 *               example: 3
 *             date_reservation:
 *               type: string
 *               format: date-time
 *               example: "2025-11-01T20:00:00Z"
 *     responses:
 *       '200':
 *         description: Réservation mise à jour avec succès.
 *       '404':
 *         description: Réservation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:id",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.updateReservConcert);

/**
 * @swagger
 * /api/reservConcert/{id}:
 *   delete:
 *     summary: Supprimer une réservation de concert
 *     description: Permet de supprimer une réservation de concert grâce à son identifiant. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Réservation Concert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation à supprimer
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: Réservation supprimée avec succès.
 *       '404':
 *         description: Réservation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id",  sessionMiddleware.authVerif([1,2,3]), ReservConcertController.deleteReservConcert);

module.exports = router;