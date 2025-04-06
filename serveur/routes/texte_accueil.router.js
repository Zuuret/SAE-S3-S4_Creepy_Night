const express = require("express");
const textController = require("../controllers/text.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/texte-accueil:
 *   get:
 *     summary: Récupérer le texte d'accueil
 *     description: |
 *       Cette route permet de récupérer le texte d'accueil affiché sur la page principale du site.
 *       Si une langue est spécifiée (ex : `en`), les colonnes `titre_en` et `contenu_en` seront utilisées, sinon ce seront `titre` et `contenu`.
 *     tags:
 *       - texte accueil
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [fr, en]
 *         description: Langue du texte d'accueil (français par défaut)
 *     responses:
 *       '200':
 *         description: Texte d'accueil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titre:
 *                   type: string
 *                   example: Bienvenue au festival Flippe ta ville !
 *                   description: Titre du texte d'accueil
 *                 contenu:
 *                   type: string
 *                   example: Venez découvrir nos concerts, expositions, activités et bien plus encore...
 *                   description: Contenu principal du texte d'accueil
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/", textController.getTexteAccueil);

/**
 * @swagger
 * /api/texte-accueil:
 *   put:
 *     summary: Mettre à jour le texte d'accueil
 *     description: |
 *       Permet à un administrateur (niveau 3 requis) de mettre à jour le contenu du texte d'accueil.
 *       Le champ `date_maj` est automatiquement mis à jour à la date actuelle.
 *     tags:
 *       - texte accueil
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: body
 *         name: texte
 *         description: Nouveau contenu pour le texte d'accueil
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - titre
 *             - contenu
 *           properties:
 *             titre:
 *               type: string
 *               example: Bienvenue à l’édition 2025 de CreepyNight !
 *               description: Nouveau titre d’accueil
 *             contenu:
 *               type: string
 *               example: Découvrez les nouveautés de cette année, comme Uber Flippe, Carrihorreur, Cauchemarathon...
 *               description: Nouveau contenu d’accueil
 *     responses:
 *       '200':
 *         description: Texte d'accueil mis à jour avec succès
 *       '400':
 *         description: Données invalides
 *       '401':
 *         description: Non autorisé - Token ou session manquante
 *       '403':
 *         description: Accès refusé - Permissions insuffisantes
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/",  sessionMiddleware.authVerif([3]), textController.updateTexteAccueil);

module.exports = router;