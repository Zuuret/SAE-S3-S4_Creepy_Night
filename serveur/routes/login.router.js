const express = require("express");
const sessionMiddleware = require("../middlewares/session.middleware");

var router = express.Router();

/**
 * @swagger
 * /api/login/user:
 *   post:
 *     summary: Authentifier un utilisateur
 *     description: Permet à un utilisateur de se connecter et de recevoir un token d'authentification.
 *     tags:
 *       - Authentification
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Identifiants de connexion de l'utilisateur.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       '200':
 *         description: Connexion réussie, retour d'un token et des données utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     mail:
 *                       type: string
 *                       example: "user@example.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Mot de passe incorrect ou utilisateur non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post('/user', sessionMiddleware.signinUser);

/**
 * @swagger
 * /api/login/presta:
 *   post:
 *     summary: Authentifier un prestataire
 *     description: Permet à un prestataire de se connecter et de recevoir un token d'authentification.
 *     tags:
 *       - Authentification
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Identifiants de connexion du prestataire.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: "presta@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       '200':
 *         description: Connexion réussie, retour d'un token et des données prestataire.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *                     email:
 *                       type: string
 *                       example: "presta@example.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Mot de passe incorrect ou prestataire non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post('/presta', sessionMiddleware.signinPresta);

/**
 * @swagger
 * /api/login/orga:
 *   post:
 *     summary: Authentifier un organisateur
 *     description: Permet à un organisateur de se connecter et de recevoir un token d'authentification.
 *     tags:
 *       - Authentification
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Identifiants de connexion de l'organisateur.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: "orga@example.com"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       '200':
 *         description: Connexion réussie, retour d'un token et des données organisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: number
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174999"
 *                     email:
 *                       type: string
 *                       example: "orga@example.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Mot de passe incorrect ou organisateur non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post('/orga', sessionMiddleware.signinOrga);

module.exports = router;