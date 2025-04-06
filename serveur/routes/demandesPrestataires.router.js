const express = require("express");
const demandesPrestatairesController = require("../controllers/demandesPrestataires.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/demandesPrestataires:
 *   post:
 *     summary: "Créer une demande de prestataire"
 *     description: "Permet de créer une nouvelle demande pour devenir prestataire."
 *     tags:
 *       - "Demandes Prestataires"
 *     parameters:
 *       - in: body
 *         name: demande
 *         description: "Données de la demande de prestataire"
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - societe
 *             - adresse
 *             - email
 *             - statut
 *             - password
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               description: "Identifiant unique de la demande"
 *               example: "223e4567-e89b-12d3-a456-426614174111"
 *             societe:
 *               type: string
 *               description: "Nom de la société"
 *               example: "MaSociete"
 *             adresse:
 *               type: string
 *               description: "Adresse de la société"
 *               example: "12 Rue de l'Exemple, 75000 Paris"
 *             email:
 *               type: string
 *               description: "Adresse email de contact"
 *               example: "contact@masociete.com"
 *             statut:
 *               type: string
 *               description: "Statut de la demande (ex. en attente, approuvé, rejeté)"
 *               example: "en attente"
 *             password:
 *               type: string
 *               description: "Mot de passe associé à la demande"
 *               example: "motdepasse123"
 *     responses:
 *       '200':
 *         description: "Demande créée avec succès"
 *       '400':
 *         description: "Données invalides ou demande non valide"
 *       '500':
 *         description: "Erreur interne du serveur"
 */
router.post("/",  demandesPrestatairesController.saveDemandePrestataire);

/**
 * @swagger
 * /api/demandesPrestataires:
 *   get:
 *     summary: Récupérer toutes les demandes de prestataires
 *     description: Permet de récupérer la liste de toutes les demandes de prestataires. (Accès restreint aux utilisateurs avec rôles [2,3])
 *     tags:
 *       - Demandes Prestataires
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
 *                     example: "223e4567-e89b-12d3-a456-426614174111"
 *                   societe:
 *                     type: string
 *                     example: "MaSociete"
 *                   adresse:
 *                     type: string
 *                     example: "12 Rue de l'Exemple, 75000 Paris"
 *                   email:
 *                     type: string
 *                     example: "contact@masociete.com"
 *                   statut:
 *                     type: string
 *                     example: "en attente"
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.getDemandesPrestataires);

/**
 * @swagger
 * /api/demandesPrestataires/{uuid}:
 *   get:
 *     summary: Récupérer une demande de prestataire par UUID
 *     description: Permet de récupérer une demande de prestataire grâce à son UUID. (Accès restreint aux utilisateurs avec rôles [2,3])
 *     tags:
 *       - Demandes Prestataires
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de la demande de prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "223e4567-e89b-12d3-a456-426614174111"
 *     responses:
 *       '200':
 *         description: Demande récupérée avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.getDemandePrestataireById);

/**
 * @swagger
 * /api/demandesPrestataires/{uuid}:
 *   put:
 *     summary: Modifier une demande de prestataire par UUID
 *     description: Permet de mettre à jour une demande de prestataire existante grâce à son UUID. (Accès restreint aux utilisateurs avec rôles [2,3])
 *     tags:
 *       - Demandes Prestataires
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de la demande à mettre à jour
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "223e4567-e89b-12d3-a456-426614174111"
 *       - in: body
 *         name: demande
 *         description: Données de la demande de prestataire à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             societe:
 *               type: string
 *               description: Nom de la société
 *               example: "MaSociete"
 *             adresse:
 *               type: string
 *               description: Adresse de la société
 *               example: "12 Rue de l'Exemple, 75000 Paris"
 *             email:
 *               type: string
 *               description: Adresse email de contact
 *               example: "contact@masociete.com"
 *             statut:
 *               type: string
 *               description: Statut de la demande (ex.en attente, approuvé, rejeté)
 *               example: "en attente"
 *             password:
 *               type: string
 *               description: Mot de passe associé à la demande
 *               example: "motdepasse123"
 *     responses:
 *       '200':
 *         description: Demande mise à jour avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.updateDemandePrestataire);

/**
 * @swagger
 * /api/demandesPrestataires/{uuid}:
 *   delete:
 *     summary: Supprimer une demande de prestataire par UUID
 *     description: Permet de supprimer une demande de prestataire grâce à son UUID. (Accès restreint aux utilisateurs avec rôles [2,3])
 *     tags:
 *       - Demandes Prestataires
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
 *           example: "223e4567-e89b-12d3-a456-426614174111"
 *     responses:
 *       '200':
 *         description: Demande supprimée avec succès
 *       '404':
 *         description: Demande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/:uuid",  sessionMiddleware.authVerif([2,3]), demandesPrestatairesController.deleteDemandePrestataire);

module.exports = router;