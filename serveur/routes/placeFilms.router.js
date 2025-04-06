const express = require("express");
const placeFilmsController = require("../controllers/placeFilms.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/placeFilms:
 *   post:
 *     summary: Réserver une place pour un film
 *     description: Permet à un utilisateur authentifié (rôles [1,2,3]) de réserver une place pour un film. La réservation est enregistrée dans la table "reserve_film", une transaction est créée dans "Transaction" et les détails (type, nombre et prix des places) sont insérés dans "places_films".
 *     tags:
 *       - Place Films
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: reservationFilm
 *         description: Données pour réserver une place pour un film
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - user
 *             - nom_film
 *             - id_film
 *             - nb_places
 *             - prix_billets
 *             - liste_places_film
 *           properties:
 *             user:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur (Utilisateur.id)
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             nom_film:
 *               type: string
 *               description: Nom du film
 *               example: "CinePeur"
 *             id_film:
 *               type: number
 *               description: Identifiant du film (Films.id)
 *               example: 5
 *             nb_places:
 *               type: number
 *               description: Nombre de places réservées
 *               example: 2
 *             prix_billets:
 *               type: number
 *               format: float
 *               description: Montant total à payer pour la réservation
 *               example: 20.00
 *             liste_places_film:
 *               type: array
 *               description: Tableau de tableaux définissant les détails des places à insérer dans "places_films". Chaque sous-tableau contient [id_film, type_place, nb_places, prix_place].
 *               items:
 *                 type: array
 *                 example: [5, "VIP", 2, 10.00]
 *     responses:
 *       '200':
 *         description: Réservation enregistrée avec succès.
 *       '400':
 *         description: Erreur de validation ou problème lors de la réservation.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.savePlaceFilm);

/**
 * @swagger
 * /api/placeFilms/{idFilm}:
 *   get:
 *     summary: Récupérer les réservations de places pour un film
 *     description: Retourne la liste des réservations enregistrées dans "places_films" pour un film donné (identifié par id_film).
 *     tags:
 *       - Place Films
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idFilm
 *         required: true
 *         description: Identifiant du film (Films.id)
 *         schema:
 *           type: number
 *           example: 5
 *     responses:
 *       '200':
 *         description: Liste des réservations récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_film:
 *                     type: number
 *                     example: 5
 *                   type_place:
 *                     type: string
 *                     example: "VIP"
 *                   nb_places:
 *                     type: number
 *                     example: 2
 *                   prix_place:
 *                     type: number
 *                     format: float
 *                     example: 10.00
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:idFilm", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.getPlaceFilms);

/**
 * @swagger
 * /api/placeFilms/{id}:
 *   delete:
 *     summary: Supprimer une réservation de place pour un film
 *     description: Supprime une réservation enregistrée dans "places_films" à partir de son identifiant.
 *     tags:
 *       - Place Films
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la réservation dans "places_films"
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       '200':
 *         description: Réservation supprimée avec succès.
 *       '404':
 *         description: Réservation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", sessionMiddleware.authVerif([1,2,3]), placeFilmsController.deletePlaceFilm);

module.exports = router;
