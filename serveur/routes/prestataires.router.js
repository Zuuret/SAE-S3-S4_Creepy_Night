const express = require("express");
const prestataireController = require("../controllers/prestataires.controller");

const router = express.Router();
/**
 * @swagger
 * /api/prestataires:
 *   post:
 *     summary: Ajouter un nouveau prestataire
 *     description: Permet d'ajouter un nouveau prestataire avec les informations fournies.
 *     tags:
 *       - Prestataires
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - societe
 *               - email
 *               - password
 *             properties:
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
 *       - Prestataires
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
 *       - Prestataires
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
 *     summary: Modifier un prestataire
 *     description: Permet de mettre à jour les informations d'un prestataire existant.
 *     tags:
 *       - Prestataires
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID du prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - societe
 *               - email
 *               - password
 *             properties:
 *               societe:
 *                 type: string
 *                 maxLength: 50
 *                 example: Societe B
 *               adresse:
 *                 type: string
 *                 maxLength: 150
 *                 example: 456 Avenue des Entrepreneurs
 *               email:
 *                 type: string
 *                 format: email
 *                 example: support@societeB.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: securePassword
 *     responses:
 *       '200':
 *         description: Modification enregistrée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:uuid", prestataireController.updatePrestataire);

/**
 * @swagger
 * /api/prestataires/{uuid}:
 *   delete:
 *     summary: Supprimer un prestataire
 *     description: Permet de supprimer un prestataire à partir de son UUID.
 *     tags:
 *       - Prestataires
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
router.delete("/:uuid", prestataireController.deletePrestataire);

module.exports = router;
