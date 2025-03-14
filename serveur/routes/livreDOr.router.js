const express = require("express");
const router = express.Router();
const livreDOrController = require("../controllers/livreDOr.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

/**
 * @swagger
 * /api/livreDOr:
 *   post:
 *     summary: Publication d'un nouveau commentaires
 *     description: Utilisé pour envoyer un commentaire
 *     tags:
 *       - livreDOr
 *     parameters:
 *       - in: body
 *         name: livreDOr
 *         description: Données du commentaire pour publier un nouveau commentaire
 *         schema:
 *           type: object
 *           required:
 *             - nom_utilisateur
 *             - evaluation
 *             - message
 *             - date
 *           properties:
 *             nom_utilisateur:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Roger
 *               description: nom utilisateur
 *             evaluation:
 *               type: int
 *               minLength: 1
 *               maxLength: 5
 *               example: 2
 *               description: note d'evaluation
 *             message:
 *               type: string
 *               minLength: 5
 *               maxLength: 200
 *               example: Ce prestataire est exceptionnel
 *               description: message
 *             date:
 *               type: string
 *               format: date
 *               example: 2025-10-27
 *               description: Date de publication du commentaire
 *     responses:
 *       '200':
 *         description: Commentaire publié avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", livreDOrController.saveLivreDOr);

/**
 * @swagger
 * /api/livreDOr:
 *   get:
 *     summary: Récupérer la liste des commentaires
 *     description: Permet de récupérer tous les commentaires du livre d'or.
 *     tags:
 *       - livreDOr
 *     responses:
 *       '200':
 *         description: Liste des commentaires récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", livreDOrController.getLivreDOr);

/**
 * @swagger
 * /api/livreDOr/{uuid}:
 *   get:
 *     summary: Récupérer un commentaire par l'uuid du prestataire
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
router.get("/:uuid", livreDOrController.getLivreDOrById);


router.put("/:uuid", livreDOrController.updateLivreDOr);


router.delete("/:uuid", livreDOrController.deleteLivreDOr);

module.exports = router;
