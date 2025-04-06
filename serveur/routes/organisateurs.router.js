const express = require("express");
const organisateursController = require("../controllers/organisateurs.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/organisateurs:
 *   post:
 *     summary: Créer un organisateur
 *     description: Permet de créer un nouvel organisateur.
 *     tags:
 *       - Organisateurs
 *     parameters:
 *       - in: body
 *         name: organisateur
 *         description: Données de l'organisateur à créer
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
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             nom:
 *               type: string
 *               example: "Dupont"
 *             prenom:
 *               type: string
 *               example: "Jean"
 *             email:
 *               type: string
 *               example: "jean.dupont@example.com"
 *             tel:
 *               type: string
 *               example: "0123456789"
 *             password:
 *               type: string
 *               example: "motdepasse123"
 *     responses:
 *       '200':
 *         description: Organisateur créé avec succès.
 *       '400':
 *         description: Données invalides.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/", organisateursController.saveOrganisateur);

/**
 * @swagger
 * /api/organisateurs:
 *   get:
 *     summary: Récupérer tous les organisateurs
 *     description: Permet de récupérer la liste de tous les organisateurs.
 *     tags:
 *       - Organisateurs
 *     responses:
 *       '200':
 *         description: Liste des organisateurs récupérée avec succès.
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
 *         description: Erreur interne du serveur.
 */
router.get("/", organisateursController.getOrganisateurs);

/**
 * @swagger
 * /api/organisateurs/{uuid}:
 *   get:
 *     summary: Récupérer un organisateur par UUID
 *     description: Permet de récupérer les informations d'un organisateur grâce à son UUID. (Accès réservé au rôle [3])
 *     tags:
 *       - Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de l'organisateur
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Organisateur récupéré avec succès.
 *       '404':
 *         description: Organisateur non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.getOrganisateurById);

/**
 * @swagger
 * /api/organisateurs/{uuid}:
 *   put:
 *     summary: Mettre à jour un organisateur par UUID
 *     description: Permet de mettre à jour les informations d'un organisateur existant grâce à son UUID. (Accès réservé au rôle [3])
 *     tags:
 *       - Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de l'organisateur à modifier
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *       - in: body
 *         name: organisateur
 *         description: Données de l'organisateur à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *               example: "Dupont"
 *             prenom:
 *               type: string
 *               example: "Jean"
 *             email:
 *               type: string
 *               example: "jean.dupont@example.com"
 *             tel:
 *               type: string
 *               example: "0123456789"
 *             password:
 *               type: string
 *               example: "nouveaumotdepasse"
 *     responses:
 *       '200':
 *         description: Organisateur mis à jour avec succès.
 *       '404':
 *         description: Organisateur non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.updateOrganisateur);

/**
 * @swagger
 * /api/organisateurs/{uuid}:
 *   delete:
 *     summary: Supprimer un organisateur par UUID
 *     description: Permet de supprimer un organisateur grâce à son UUID. (Accès réservé au rôle [3])
 *     tags:
 *       - Organisateurs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de l'organisateur à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Organisateur supprimé avec succès.
 *       '404':
 *         description: Organisateur non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:uuid",  sessionMiddleware.authVerif([3]), organisateursController.deleteOrganisateur);

module.exports = router;