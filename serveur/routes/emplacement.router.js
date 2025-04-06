const express = require("express");
const emplacementController = require("../controllers/emplacement.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/emplacement:
 *   get:
 *     summary: Récupérer la liste des emplacements
 *     description: Permet de récupérer tous les emplacements stockés dans la table "emplacement".
 *     tags:
 *       - Emplacements
 *     responses:
 *       '200':
 *         description: Liste des emplacements récupérée avec succès.
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
 *                   nom:
 *                     type: string
 *                     example: "Zone A"
 *                   coord_x:
 *                     type: integer
 *                     example: 100
 *                   coord_y:
 *                     type: integer
 *                     example: 200
 *                   prestataire_id:
 *                     type: string
 *                     format: uuid
 *                     example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *                   icone_id:
 *                     type: integer
 *                     example: 1
 *       '500':
 *         description: Erreur lors de la récupération des emplacements.
 */
router.get("/", emplacementController.getEmplacement);

/**
 * @swagger
 * /api/emplacement:
 *   put:
 *     summary: Mettre à jour un emplacement
 *     description: Permet de mettre à jour un emplacement existant. (Accès restreint aux utilisateurs avec rôle [3])
 *     tags:
 *       - Emplacements
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: emplacement
 *         description: Données de l'emplacement à mettre à jour.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - nom
 *             - coord_x
 *             - coord_y
 *             - prestataire_id
 *             - icone_id
 *           properties:
 *             id:
 *               type: integer
 *               description: Identifiant de l'emplacement.
 *               example: 1
 *             nom:
 *               type: string
 *               description: Nom de l'emplacement.
 *               example: "Zone A"
 *             coord_x:
 *               type: integer
 *               description: Coordonnée X.
 *               example: 100
 *             coord_y:
 *               type: integer
 *               description: Coordonnée Y.
 *               example: 200
 *             prestataire_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant du prestataire associé.
 *               example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *             icone_id:
 *               type: integer
 *               description: Identifiant de l'icône associée.
 *               example: 1
 *     responses:
 *       '200':
 *         description: Emplacement mis à jour avec succès.
 *       '400':
 *         description: Données invalides.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/",  sessionMiddleware.authVerif([3]), emplacementController.updateEmplacement);

module.exports = router;