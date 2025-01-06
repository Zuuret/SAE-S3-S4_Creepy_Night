const express = require("express");
const prestationController = require("../controllers/prestations.controller");

const router = express.Router();
/**
 * @swagger
 * /api/prestations:
 *   post:
 *     summary: Ajouter une nouvelle prestation
 *     description: Permet d'ajouter une nouvelle prestation avec les informations fournies.
 *     tags:
 *       - Prestations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prix
 *             properties:
 *               nom:
 *                 type: string
 *                 maxLength: 50
 *                 example: Nettoyage à domicile
 *               prix:
 *                 type: integer
 *                 example: 50
 *               description:
 *                 type: string
 *                 maxLength: 150
 *                 example: Nettoyage complet d'une maison ou appartement.
 *               image:
 *                 type: string
 *                 example: image.jpg
 *               zone_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Insertion réussie.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", prestationController.savePrestation);

/**
 * @swagger
 * /api/prestations:
 *   get:
 *     summary: Récupérer la liste des prestations
 *     description: Permet de récupérer toutes les prestations disponibles.
 *     tags:
 *       - Prestations
 *     responses:
 *       '200':
 *         description: Liste des prestations récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", prestationController.getPrestations);

/**
 * @swagger
 * /api/prestations/{id}:
 *   get:
 *     summary: Récupérer une prestation par ID
 *     description: Permet de récupérer les informations d'une prestation spécifique à partir de son ID.
 *     tags:
 *       - Prestations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la prestation
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestation récupérée avec succès.
 *       '404':
 *         description: Prestation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:id", prestationController.getPrestationById);

/**
 * @swagger
 * /api/prestations/{id}:
 *   put:
 *     summary: Modifier une prestation
 *     description: Permet de mettre à jour les informations d'une prestation existante.
 *     tags:
 *       - Prestations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la prestation
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prix
 *             properties:
 *               nom:
 *                 type: string
 *                 maxLength: 50
 *                 example: Nettoyage à domicile
 *               prix:
 *                 type: integer
 *                 example: 50
 *               description:
 *                 type: string
 *                 maxLength: 150
 *                 example: Nettoyage complet d'une maison ou appartement.
 *               image:
 *                 type: string
 *                 example: image.jpg
 *               zone_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Modification enregistrée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:id", prestationController.updatePrestation);

/**
 * @swagger
 * /api/prestations/{id}:
 *   delete:
 *     summary: Supprimer une prestation
 *     description: Permet de supprimer une prestation à partir de son ID.
 *     tags:
 *       - Prestations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la prestation
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestation supprimée avec succès.
 *       '404':
 *         description: Prestation non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id", prestationController.deletePrestation);

module.exports = router;
