const express = require("express");
const prestationController = require("../controllers/prestations.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();
/**
 * @swagger
 * /api/prestations:
 *   post:
 *     summary: Créer une nouvelle prestation
 *     description: Utilisé pour créer une nouvelle prestation
 *     tags:
 *       - prestations
 *     parameters:
 *       - in: body
 *         name: film
 *         description: Données pour créer un nouveau film
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - prix
 *           properties:
 *               nom:
 *                 type: string
 *                 maxLength: 50
 *                 example: tabassage nocturne
 *               prix:
 *                 type: integer
 *                 example: 50
 *               description:
 *                 type: string
 *                 maxLength: 150
 *                 example: un tabassage dans les règles de l'art la nuit
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
router.post("/",   sessionMiddleware.authVerif(), prestationController.savePrestation);

/**
 * @swagger
 * /api/prestations:
 *   get:
 *     summary: Récupérer la liste des prestations
 *     description: Permet de récupérer toutes les prestations disponibles.
 *     tags:
 *       - prestations
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
 *       - prestations
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
 *     summary: Modifier une prestation par ID
 *     description: Modifie une prestation existante par son ID
 *     tags:
 *       - prestations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la prestation
 *         schema:
 *           type: integer
 *           example: 1
 *           description: ID de la prestation
 *       - in: body
 *         name: prestation
 *         description: Données de la prestation à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *               minLength: 1
 *               maxLength: 50
 *               example: Snack
 *               description: Nom de la prestation
 *               required: true
 *             prix:
 *               type: integer
 *               example: 50
 *               description: Prix de la prestation (en euros)
 *               required: true
 *             description:
 *               type: string
 *               maxLength: 150
 *               example: Frites avec du sel salé
 *               description: Description de la prestation
 *             image:
 *               type: string
 *               maxLength: 50
 *               example: "los_fritas.jpg"
 *               description: image associé à la prestation
 *             zone_id:
 *               type: integer
 *               example: 3
 *               description: ID de la zone associée à la prestation
 *               required: true
 *     responses:
 *       '200':
 *         description: Prestation mise à jour
 *       '404':
 *         description: Prestation non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:id",   sessionMiddleware.authVerif(), prestationController.updatePrestation);


/**
 * @swagger
 * /api/prestations/{id}:
 *   delete:
 *     summary: Supprimer une prestation
 *     description: Permet de supprimer une prestation à partir de son ID.
 *     tags:
 *       - prestations
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
router.delete("/:id",   sessionMiddleware.authVerif(), prestationController.deletePrestation);

module.exports = router;
