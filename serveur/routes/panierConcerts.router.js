const express = require("express");
const router = express.Router();
const panierConcertController = require("../controllers/panierConcerts.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

/**
 * @swagger
 * /api/panierConcerts:
 *   post:
 *     summary: Ajouter un concert dans le panier
 *     description: Permet d'ajouter des places pour un concert dans le panier. Les données incluent l'identifiant de l'entrée, l'identifiant du concert, le type de place, le nombre de places et le prix par place.
 *     tags:
 *       - Panier Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: panierConcert
 *         description: Données à insérer dans le panier de concerts
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id_place
 *             - id_concert
 *             - type_place
 *             - nb_places
 *             - prix_place
 *           properties:
 *             id_place:
 *               type: number
 *               example: 1
 *             id_concert:
 *               type: number
 *               example: 3
 *             type_place:
 *               type: string
 *               example: "VIP"
 *             nb_places:
 *               type: number
 *               example: 2
 *             prix_place:
 *               type: number
 *               format: float
 *               example: 50.00
 *     responses:
 *       '200':
 *         description: Concert ajouté au panier avec succès.
 *       '400':
 *         description: Données invalides.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/",  sessionMiddleware.authVerif(), panierConcertController.savePanierConcerts);

/**
 * @swagger
 * /api/panierConcerts:
 *   get:
 *     summary: Récupérer tous les concerts du panier
 *     description: Permet de récupérer la liste des concerts présents dans le panier.
 *     tags:
 *       - Panier Concerts
 *     responses:
 *       '200':
 *         description: Liste des concerts du panier récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_place:
 *                     type: number
 *                     example: 1
 *                   id_concert:
 *                     type: number
 *                     example: 3
 *                   type_place:
 *                     type: string
 *                     example: "VIP"
 *                   nb_places:
 *                     type: number
 *                     example: 2
 *                   prix_place:
 *                     type: number
 *                     format: float
 *                     example: 50.00
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", panierConcertController.getPanierConcerts);

/**
 * @swagger
 * /api/panierConcerts/{uuid}:
 *   get:
 *     summary: Récupérer une entrée du panier de concerts par identifiant
 *     description: Permet de récupérer une entrée spécifique du panier de concerts grâce à son identifiant. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'entrée du panier de concerts
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: Entrée du panier récupérée avec succès.
 *       '404':
 *         description: Entrée non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierConcertController.getPanierConcertById);

/**
 * @swagger
 * /api/panierConcerts/{uuid}:
 *   put:
 *     summary: Mettre à jour une entrée du panier de concerts par identifiant
 *     description: Permet de mettre à jour les informations d'une entrée dans le panier de concerts. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'entrée du panier à mettre à jour
 *         schema:
 *           type: number
 *           example: 1
 *       - in: body
 *         name: panierConcert
 *         description: Données de l'entrée du panier à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_concert:
 *               type: number
 *               example: 3
 *             type_place:
 *               type: string
 *               example: "VIP"
 *             nb_places:
 *               type: number
 *               example: 3
 *             prix_place:
 *               type: number
 *               format: float
 *               example: 45.00
 *     responses:
 *       '200':
 *         description: Entrée du panier mise à jour avec succès.
 *       '404':
 *         description: Entrée non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierConcertController.updatePanierConcert);

/**
 * @swagger
 * /api/panierConcerts/{uuid}:
 *   delete:
 *     summary: Supprimer une entrée du panier de concerts par identifiant
 *     description: Permet de supprimer une entrée du panier de concerts grâce à son identifiant. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Concerts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'entrée du panier à supprimer
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: Entrée du panier supprimée avec succès.
 *       '404':
 *         description: Entrée non trouvée.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierConcertController.deletePanierConcert);

module.exports = router;
