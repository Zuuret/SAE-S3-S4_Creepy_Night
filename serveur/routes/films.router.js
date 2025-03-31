const express = require("express");
const filmController = require("../controllers/films.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();
/**
 * @swagger
 * /api/films:
 *   post:
 *     summary: Créer un nouveau film
 *     description: Utilisé pour créer un nouveau film
 *     tags:
 *       - films
 *     parameters:
 *       - in: body
 *         name: film
 *         description: Données pour créer un nouveau film
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - date
 *             - duree
 *             - nb_places
 *             - prix
 *           properties:
 *               nom:
 *                 type: string
 *                 maxLength: 50
 *                 example: Avatar
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-07T20:00:00
 *               duree:
 *                 type: integer
 *                 example: 120
 *               image:
 *                 type: string
 *                 example: avatar.jpg
 *               categorie:
 *                 type: string
 *                 example: Science Fiction
 *               salle:
 *                 type: string
 *                 example: Salle 1
 *               nb_places:
 *                 type: integer
 *                 example: 200
 *               prix:
 *                 type: number
 *                 format: decimal
 *                 example: 10.5
 *     responses:
 *       '200':
 *         description: Insertion réussie.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", sessionMiddleware.authVerif, filmController.saveFilm);

/**
 * @swagger
 * /api/films:
 *   get:
 *     summary: Récupérer la liste des films
 *     description: Permet de récupérer tous les films disponibles.
 *     tags:
 *       - films
 *     responses:
 *       '200':
 *         description: Liste des films récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", filmController.getFilms);

/**
 * @swagger
 * /api/films/{id}:
 *   get:
 *     summary: Récupérer un film par ID
 *     description: Permet de récupérer les informations d'un film à partir de son ID.
 *     tags:
 *       - films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Film récupéré avec succès.
 *       '404':
 *         description: Film non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:id", filmController.getFilmById);

/**
 * @swagger
 * /api/films/{id}:
 *   put:
 *     summary: Modifier un film par ID
 *     description: Modifie un film existant par son ID
 *     tags:
 *       - films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du film
 *         schema:
 *           type: string
 *           format: id
 *           minLength: 1
 *           maxLength: 5
 *           example: 3
 *           description: ID du film
 *           required: true
 *       - in: body
 *         name: film
 *         description: Données du film à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Massacre à la tronçonneuse(1974)
 *               description: Nom de film
 *               required: true
 *             date:
 *               type: string
 *               format: date
 *               example: 2000-01-01
 *               description: Date de diffusion du film
 *               required: true
 *             duree:
 *               type: string
 *               minLength: 7
 *               maxLength: 8
 *               example: 1:47:00
 *               description: duree du film
 *               required: true
 *             image:
 *               type: string
 *               minLength: 2
 *               maxLength: 55
 *               example: affiche_qui_fait_peur.png
 *               description: image du film
 *               required: true
 *             categorie:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: horreur
 *               description: genre
 *               required: true
 *               unique: true
 *             salle:
 *               type: string
 *               minLength: 1
 *               maxLength: 10
 *               example: Salle 3
 *               description: où est diffusé le film
 *               required: true
 *             nb_places:
 *               type: string
 *               minLength: 1
 *               maxLength: 2
 *               example: 22
 *               description: nombre de place disponible
 *               required: true
 *             prix:
 *               type: string
 *               minLength: 1
 *               maxLength: 10
 *               example: 22
 *               description: Prix de la place
 *               required: true
 *     responses:
 *       '200':
 *         description: film mis à jour
 *       '404':
 *         description: film non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:id", sessionMiddleware.authVerif, filmController.updateFilm);

/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     summary: Supprimer un film
 *     description: Permet de supprimer un film à partir de son ID.
 *     tags:
 *       - films
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Film supprimé avec succès.
 *       '404':
 *         description: Film non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", sessionMiddleware.authVerif, filmController.deleteFilm);

module.exports = router;
