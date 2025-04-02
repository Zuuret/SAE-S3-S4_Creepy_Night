const express = require("express");
const expoController = require("../controllers/expos.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/expos:
 *   post:
 *     summary: Créer une nouvelle expo
 *     description: Utilisé pour créer une nouvelle expo
 *     tags:
 *       - expos
 *     parameters:
 *       - in: body
 *         name: expo
 *         description: Données pour créer une nouvelle expo
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
 *               example: leroi
 *               description: nom exposant
 *             email:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: salut@crea.com
 *               description: email
 *             date_crea:
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
 *             description:
 *              type: string
 *              minLength: 3
 *              maxLength: 33
 *              example: Jersey
 *             image:
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
router.post("/",  sessionMiddleware.authVerif([1,2,3]), expoController.saveExpo);

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
 * /api/expos/{id}:
 *   put:
 *     summary: Modifier une exposition par ID
 *     description: Modifie une exposition existante par son ID
 *     tags:
 *       - expos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'oeuvre
 *         schema:
 *           type: string
 *           format: id
 *           minLength: 1
 *           maxLength: 5
 *           example: 3
 *           description: ID de l'oeuvre
 *           required: true
 *       - in: body
 *         name: concert
 *         description: Données de l'oeuvre à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             createur:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Tupac
 *               description: Nom de créateur d'oeuvre
 *               required: true
 *             email:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Tupac@50cent.fr
 *               description: adresse mail
 *               required: true
 *             date_crea:
 *               type: string
 *               format: date
 *               example: 2000-01-01
 *               description: Date de création de l'oeuvre
 *               required: true
 *             description:
 *               type: string
 *               minLength: 5
 *               maxLength: 8
 *               example: figurine
 *               description: description de l'oeuvre
 *               required: true
 *             image:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: batmobile.png
 *               description: image
 *               required: true
 *               unique: true
 *     responses:
 *       '200':
 *         description: oeuvre mise à jour
 *       '404':
 *         description: oeuvre non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:id",  sessionMiddleware.authVerif([1,2,3]), expoController.updateExpo);

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
router.delete("/:id",  sessionMiddleware.authVerif([1,2,3]), expoController.deleteExpo);

module.exports = router;
