const express = require("express");
const expoController = require("../controllers/expos.controller");

const router = express.Router();

/**
 * @swagger
 * /api/expos:
 *   post:
 *     summary: Créer une nouvelle expo
 *     description: Utilisé pour créer une nouvelle expo
 *     tags:
 *       -expos
 *     parameters:
 *       - in: body
 *         name: expo
 *         description: Données du concert pour créer une nouvelle expo
 *         schema:
 *           type: object
 *           required:
 *             - createur
 *             - email
 *             - date_crea
 *             - description
 *             - image
 *           properties:
 *             createur:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: barbu
 *               description: nom exposant
 *             email:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: salut@crea.com
 *               description: email
 *             date:
 *               type: string
 *               format: date
 *               example: 2025-10-27
 *               description: Date du concert
 *             heure:
 *               type: string
 *               minLength: 8
 *               maxLength: 8
 *               example: 23:00:00
 *               description: heure
 *             categorie:
 *              type: string
 *              minLength: 3
 *              maxLength: 33
 *              example: Jersey
 *             scene:
 *              type: string
 *              minLength: 3
 *              maxLength: 20
 *              example: grande scene
 *     responses:
 *       '200':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", concertController.saveConcert);

/**
 * @swagger
 * /api/expos:
 *   get:
 *     summary: Récupérer toutes les expositions
 *     description: Permet de récupérer la liste complète des expositions.
 *     tags:
 *       - expos
 *     responses:
 *       '200':
 *         description: Liste des expositions récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", expoController.getExpos);

/**
 * @swagger
 * /api/expos/{id}:
 *   get:
 *     summary: Récupérer une exposition par ID
 *     description: Permet de récupérer les informations d'une exposition grâce à son ID.
 *     tags:
 *       - expos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'exposition
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Exposition récupérée avec succès.
 *       '404':
 *         description: Exposition non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:id", expoController.getExpoById);

/**
 * @swagger
 * /api/expos:
 *   put:
 *     summary: Modifier une exposition
 *     description: Permet de modifier les informations d'une exposition existante.
 *     tags:
 *       - expos
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
 *               createur:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               date_crea:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-07T10:00:00
 *               description:
 *                 type: string
 *                 example: Une exposition mise à jour.
 *               image:
 *                 type: string
 *                 example: image2.jpg
 *     responses:
 *       '200':
 *         description: Modification enregistrée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/", expoController.updateExpo);

/**
 * @swagger
 * /api/expos/{id}:
 *   delete:
 *     summary: Supprimer une exposition
 *     description: Permet de supprimer une exposition existante grâce à son ID.
 *     tags:
 *       - expos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'exposition
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Exposition supprimée avec succès.
 *       '404':
 *         description: Exposition non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", expoController.deleteExpo);

module.exports = router;
