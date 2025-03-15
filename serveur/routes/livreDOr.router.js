const express = require("express");
const router = express.Router();
const livreDOrController = require("../controllers/livreDOr.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

/**
 * @swagger
 * /api/livreDOr/{prestataire_id}:
 *   post:
 *     summary: Publication d'un nouveau commentaire
 *     description: Utilisé pour publier un commentaire
 *     tags:
 *       - livreDOr
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: string
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
 *               minLength: 3
 *               maxLength: 255
 *               example: Roger
 *               description: nom utilisateur
 *             evaluation:
 *               type: integer
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
router.post("/:prestataire_id", livreDOrController.saveLivreDOr);

/**
 * @swagger
 * /api/livreDOr:
 *   get:
 *     summary: Récupérer les livres d'or de tout les prestatataires.
 *     description: Permet de récupérer tous le contenu de tout les livres d'or existant.
 *     tags:
 *       - livreDOr
 *     responses:
 *       '200':
 *         description: Liste des livres d'or récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", livreDOrController.getAllLivreDOr);

/**
 * @swagger
 * /api/livreDOr/{prestataire_id}:
 *   get:
 *     summary: Récupérer un livre d'or spécifique par l'uuid du prestataire
 *     description: Permet de récupérer le livre d'or d'un prestataire à partir de son uuid.
 *     tags:
 *       - livreDOr
 *     parameters:
 *       - in: path
 *         name: prestataire_id
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Livre d'or récupéré avec succès.
 *       '404':
 *         description: Livre d'or non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:prestataire_id", livreDOrController.getLivreDOrById);

/**
 * @swagger
 * /api/livreDOr/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     description: Permet de supprimer un commentaire existant grâce à son ID.
 *     tags:
 *       - livreDOr
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Commentaire supprimé avec succès.
 *       '404':
 *         description: Commentaire non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", livreDOrController.deleteCommentaire);

module.exports = router;
