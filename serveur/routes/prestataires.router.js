const express = require("express");
const prestataireController = require("../controllers/prestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();
/**
 * @swagger
 * /api/prestataires:
 *   post:
 *     summary: Créer un nouveau prestataire
 *     description: Utilisé pour créer un nouveau prestataire
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: body
 *         name: prestataire
 *         description: Données pour créer un nouveau prestataire
 *         schema:
 *           type: object
 *           required:
 *             - societe
 *             - email
 *             - password
 *           properties:
 *               societe:
 *                 type: string
 *                 maxLength: 50
 *                 example: Societe A
 *               adresse:
 *                 type: string
 *                 maxLength: 150
 *                 example: 123 Rue des Entreprises
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contact@societeA.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Insertion réussie.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", prestataireController.savePrestataire);

/**
 * @swagger
 * /api/prestataires:
 *   get:
 *     summary: Récupérer la liste des prestataires
 *     description: Permet de récupérer tous les prestataires disponibles.
 *     tags:
 *       - prestataires
 *     responses:
 *       '200':
 *         description: Liste des prestataires récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", prestataireController.getPrestataires);

/**
 * @swagger
 * /api/prestataires/{uuid}:
 *   get:
 *     summary: Récupérer un prestataire par UUID
 *     description: Permet de récupérer les informations d'un prestataire à partir de son UUID.
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID du prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Prestataire récupéré avec succès.
 *       '404':
 *         description: Prestataire non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid", sessionMiddleware.authVerif, prestataireController.getPrestataireById);

/**
 * @swagger
 * /api/prestataires/{uuid}:
 *   put:
 *     summary: Modifier un prestataire par ID
 *     description: Modifie un prestataire existant par son UUID
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID du prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *           minLength: 36
 *           maxLength: 36
 *           example: 5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6
 *       - in: body
 *         name: prestataire
 *         description: Données du prestataire à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             societe:
 *               type: string
 *               minLength: 1
 *               maxLength: 50
 *               example: Argentcorp
 *               description: Nom de la société
 *               required: true
 *             adresse:
 *               type: string
 *               maxLength: 150
 *               example: "10 rue de l'Entreprise, 75000 Paris"
 *               description: Adresse de la société
 *             email:
 *               type: string
 *               minLength: 5
 *               maxLength: 50
 *               example: contact@ezmoipitie.com
 *               description: Adresse e-mail du prestataire
 *               required: true
 *               unique: true
 *             password:
 *               type: string
 *               minLength: 8
 *               maxLength: 150
 *               example: "passwordSecurise123"
 *               description: Mot de passe du prestataire
 *               required: true
 *     responses:
 *       '200':
 *         description: Prestataire mis à jour
 *       '404':
 *         description: Prestataire non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:uuid", sessionMiddleware.authVerif, prestataireController.updatePrestataire);


/**
 * @swagger
 * /api/prestataires/{uuid}:
 *   delete:
 *     summary: Supprimer un prestataire
 *     description: Permet de supprimer un prestataire à partir de son UUID.
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID du prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Prestataire supprimé avec succès.
 *       '404':
 *         description: Prestataire non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:uuid", sessionMiddleware.authVerif, prestataireController.deletePrestataire);

module.exports = router;
