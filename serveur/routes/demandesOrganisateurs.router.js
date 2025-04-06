const express = require("express");
const demandesOrganisateursController = require("../controllers/demandesOrganisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/demandesOrganisateurs:
 *   post:
 *     summary: Créer une demande d'organisateur
 *     description: Permet de créer une nouvelle demande pour devenir organisateur.
 *     tags:
 *       - Demandes Organisateurs
 *     parameters:
 *       - in: body
 *         name: demande
 *         description: Données de la demande d'organisateur
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - nom
 *             - prenom
 *             - email
 *             - tel
 *             - password
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: Identifiant unique de la demande
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             nom:
 *               type: string
 *               description: Nom de l'organisateur
 *               example: "Dupont"
 *             prenom:
 *               type: string
 *               description: Prénom de l'organisateur
 *               example: "Jean"
 *             email:
 *               type: string
 *               description: Adresse email de l'organisateur
 *               example: "jean.dupont@example.com"
 *             tel:
 *               type: string
 *               description: Numéro de téléphone
 *               example: "0123456789"
 *             password:
 *               type: string
 *               description: Mot de passe choisi
 *               example: "motdepasse123"
 *     responses:
 *       '200':
 *         description: Demande créée avec succès
 *       '400':
 *         description: Données invalides ou demande non valide
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", demandesOrganisateursController.saveDemandeOrganisateurs);

/**
 * @swagger
 * /api/demandesOrganisateurs:
 *   get:
 *     summary: Récupérer toutes les demandes d'organisateurs
 *     description: Permet de récupérer la liste de toutes les demandes d'organisateurs. (Accès restreint aux utilisateurs avec rôle [3])
 *     tags:
 *       - Demandes Organisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Liste des demandes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   nom:
 *                     type: string
 *                     example: "Dupont"
 *                   prenom:
 *                     type: string
 *                     example: "Jean"
 *                   email:
 *                     type: string
 *                     example: "jean.dupont@example.com"
 *                   tel:
 *                     type: string
 *                     example: "0123456789"
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.getDemandesOrganisateurs);

/**
 * @swagger
 * /api/demandesOrganisateurs/{uuid}:
 *   get:
 *     summary: Récupérer une demande d'organisateur par UUID
 *     description: Permet de récupérer une demande d'organisateur grâce à son UUID. (Accès restreint aux utilisateurs avec rôle [3])
 *     tags:
 *       - Demandes Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de la demande d'organisateur
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Demande récupérée avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.getDemandeOrganisateursById);

/**
 * @swagger
 * /api/demandesOrganisateurs/{uuid}:
 *   put:
 *     summary: Modifier une demande d'organisateur par UUID
 *     description: Permet de mettre à jour une demande d'organisateur existante grâce à son UUID. (Accès restreint aux utilisateurs avec rôle [3])
 *     tags:
 *       - Demandes Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de la demande d'organisateur à modifier
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *       - in: body
 *         name: demande
 *         description: Données de la demande à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *               description: Nom de l'organisateur
 *               example: "Dupont"
 *             prenom:
 *               type: string
 *               description: Prénom de l'organisateur
 *               example: "Jean"
 *             email:
 *               type: string
 *               description: Adresse email de l'organisateur
 *               example: "jean.dupont@example.com"
 *             tel:
 *               type: string
 *               description: Numéro de téléphone
 *               example: "0123456789"
 *             password:
 *               type: string
 *               description: Nouveau mot de passe (si mise à jour)
 *               example: "nouveaumotdepasse"
 *     responses:
 *       '200':
 *         description: Demande mise à jour avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.updateDemandeOrganisateurs);

/**
 * @swagger
 * /api/demandesOrganisateurs/{uuid}:
 *   delete:
 *     summary: Supprimer une demande d'organisateur par UUID
 *     description: Permet de supprimer une demande d'organisateur grâce à son UUID. (Accès restreint aux utilisateurs avec rôle [3])
 *     tags:
 *       - Demandes Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de la demande à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Demande supprimée avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/:uuid",  sessionMiddleware.authVerif([3]), demandesOrganisateursController.deleteDemandeOrganisateurs);

module.exports = router;