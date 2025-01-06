const express = require("express");
const concertController = require("../controllers/concerts.controller");

const router = express.Router();

/**
 * @swagger
 * /api/concerts:
 *   post:
 *     summary: Ajouter un nouveau concert
 *     description: Permet d'ajouter un nouveau concert dans la base de données.
 *     tags:
 *       - concerts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - artiste
 *               - nationalite
 *               - date
 *               - heure
 *               - duree
 *             properties:
 *               artiste:
 *                 type: string
 *                 example: Coldplay
 *               nationalite:
 *                 type: string
 *                 example: Britannique
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-15
 *               heure:
 *                 type: string
 *                 format: time
 *                 example: 20:00:00
 *               duree:
 *                 type: integer
 *                 example: 120
 *               categorie:
 *                 type: string
 *                 example: Pop
 *               scene:
 *                 type: string
 *                 example: Grande scène
 *     responses:
 *       '201':
 *         description: Concert ajouté avec succès.
 *       '400':
 *         description: Requête invalide.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", concertController.addConcert);

/**
 * @swagger
 * /api/concerts:
 *   get:
 *     summary: Récupérer tous les concerts
 *     description: Permet de récupérer la liste de tous les concerts.
 *     tags:
 *       - concerts
 *     responses:
 *       '200':
 *         description: Liste des concerts récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", concertController.getAllConcerts);

/**
 * @swagger
 * /api/concerts/{id}:
 *   get:
 *     summary: Récupérer un concert par ID
 *     description: Permet de récupérer les informations d'un concert grâce à son ID.
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du concert
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Concert récupéré avec succès.
 *       '404':
 *         description: Concert non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:id", concertController.getConcertById);

/**
 * @swagger
 * /api/concerts/{id}:
 *   put:
 *     summary: Modifier un concert
 *     description: Permet de modifier les informations d'un concert existant.
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du concert
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artiste:
 *                 type: string
 *                 example: Coldplay
 *               nationalite:
 *                 type: string
 *                 example: Britannique
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-15
 *               heure:
 *                 type: string
 *                 format: time
 *                 example: 20:00:00
 *               duree:
 *                 type: integer
 *                 example: 120
 *               categorie:
 *                 type: string
 *                 example: Pop
 *               scene:
 *                 type: string
 *                 example: Grande scène
 *     responses:
 *       '200':
 *         description: Concert modifié avec succès.
 *       '404':
 *         description: Concert non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:id", concertController.updateConcert);

/**
 * @swagger
 * /api/concerts/{id}:
 *   delete:
 *     summary: Supprimer un concert
 *     description: Permet de supprimer un concert existant grâce à son ID.
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du concert
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Concert supprimé avec succès.
 *       '404':
 *         description: Concert non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", concertController.deleteConcert);

module.exports = router;