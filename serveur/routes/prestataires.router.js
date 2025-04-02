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
router.get("/:uuid", prestataireController.getPrestataireById);

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
router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), prestataireController.updatePrestataire);


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
router.delete("/:uuid",  sessionMiddleware.authVerif([2]), prestataireController.deletePrestataire);

/**
 * @swagger
 * /api/prestataires/{uuid}/description:
 *   patch:
 *     summary: Modification de la description d'un prestataire
 *     description: Utilisé pour modifier la description d'un prestataire
 *     tags:
 *       - Informations prestataire
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: string
 *       - in: body
 *         name: informationsPrestataire
 *         description: Données de la nouvelle description
 *         schema:
 *           type: object
 *           required:
 *             - description
 *           properties:
 *             description:
 *               type: string
 *               minLength: 3
 *               maxLength: 255
 *               example: Je change de description
 *               description: nouvelle description
 *     responses:
 *       '200':
 *         description: Description modifiée avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/:uuid/description", sessionMiddleware.authVerif([1,2,3]), prestataireController.updateDescription);

/**
 * @swagger
 * /api/prestataires/{uuid}/societe:
 *   patch:
 *     summary: Modification de le nom de société d'un prestataire
 *     description: Utilisé pour modifier le nom de société d'un prestataire
 *     tags:
 *       - Informations prestataire
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: string
 *       - in: body
 *         name: informationsPrestataire
 *         description: Données de la nouvelle société
 *         schema:
 *           type: object
 *           required:
 *             - société
 *           properties:
 *             société:
 *               type: string
 *               minLength: 3
 *               maxLength: 255
 *               example: Burger Kingdom
 *               description: nouveau nom de société
 *     responses:
 *       '200':
 *         description: Société modifiée avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/:uuid/societe", sessionMiddleware.authVerif([2]), prestataireController.updateSociete);

/**
 * @swagger
 * /api/prestataires/{uuid}/theme:
 *   patch:
 *     summary: Modification du theme d'un prestataire
 *     description: Utilisé pour modifier le theme d'un prestataire
 *     tags:
 *       - Informations prestataire
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: string
 *       - in: body
 *         name: informationsPrestataire
 *         description: Données du nouveau theme
 *         schema:
 *           type: object
 *           required:
 *             - theme
 *           properties:
 *             theme:
 *               type: string
 *               minLength: 3
 *               maxLength: 255
 *               example: Bonbons
 *               description: nouveau thème
 *     responses:
 *       '200':
 *         description: Thème modifiée avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/:uuid/theme", sessionMiddleware.authVerif([2]), prestataireController.updateTheme);

/**
 * @swagger
 * /api/prestataires/{uuid}/adresse:
 *   patch:
 *     summary: Modification de l'adresse d'un prestataire
 *     description: Utilisé pour modifier l'adresse' d'un prestataire
 *     tags:
 *       - Informations prestataire
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Uuid du prestataire
 *         schema:
 *           type: string
 *       - in: body
 *         name: informationsPrestataire
 *         description: Données de la nouvelle adresse
 *         schema:
 *           type: object
 *           required:
 *             - adresse
 *           properties:
 *             adresse:
 *               type: string
 *               minLength: 3
 *               maxLength: 255
 *               example: 25 rue de la frite
 *               description: nouvelle adresse
 *     responses:
 *       '200':
 *         description: Adresse modifiée avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.patch("/:uuid/adresse", sessionMiddleware.authVerif([2,3]), prestataireController.updateAdresse);


const multer = require("multer");
const upload = multer({ dest: "assets/" });

router.post("/:uuid/background", sessionMiddleware.authVerif(), upload.single('image'), prestataireController.updateImage);


module.exports = router;
