const express = require("express");
const filmController = require("../controllers/films.controller");

const router = express.Router();
/**
 * @swagger
 * /api/films:
 *   post:
 *     summary: Ajouter un nouveau film
 *     description: Permet d'ajouter un nouveau film avec les informations fournies.
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - date
 *               - duree
 *               - nb_places
 *               - prix
 *             properties:
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
router.post("/", filmController.saveFilm);

/**
 * @swagger
 * /api/films:
 *   get:
 *     summary: Récupérer la liste des films
 *     description: Permet de récupérer tous les films disponibles.
 *     tags:
 *       - Films
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
 *       - Films
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
 * /api/films:
 *   put:
 *     summary: Modifier un film
 *     description: Permet de mettre à jour les informations d'un film existant.
 *     tags:
 *       - Films
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               nom:
 *                 type: string
 *                 example: Avatar 2
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-08T18:30:00
 *               duree:
 *                 type: integer
 *                 example: 150
 *               image:
 *                 type: string
 *                 example: avatar2.jpg
 *               categorie:
 *                 type: string
 *                 example: Aventure
 *               salle:
 *                 type: string
 *                 example: Salle 2
 *               nb_places:
 *                 type: integer
 *                 example: 150
 *               prix:
 *                 type: number
 *                 format: decimal
 *                 example: 12.0
 *     responses:
 *       '200':
 *         description: Modification enregistrée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/", filmController.updateFilm);

/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     summary: Supprimer un film
 *     description: Permet de supprimer un film à partir de son ID.
 *     tags:
 *       - Films
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
router.delete("/:id", filmController.deleteFilm);

module.exports = router;
