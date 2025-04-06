const express = require("express");
const iconeCarteController = require("../controllers/iconeCarte.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/iconeCarte:
 *   get:
 *     summary: Récupérer les icônes de carte
 *     description: Permet de récupérer toutes les icônes présentes dans la table "icone_carte".
 *     tags:
 *       - Icônes Carte
 *     responses:
 *       '200':
 *         description: Liste des icônes récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nom_image:
 *                     type: string
 *                     example: "icone1.png"
 *       '500':
 *         description: Erreur lors de la récupération des icônes.
 */
router.get("/", iconeCarteController.getIcone);

module.exports = router;