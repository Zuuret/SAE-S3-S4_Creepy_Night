const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");


/**
 * @swagger
 * /api/articles/prestataire/{idPrestataire}:
 *   get:
 *     summary: Récupérer tous les articles d’un prestataire donné
 *     description: Permet de récupérer la liste de tous les articles d’un prestataire spécifié par son identifiant.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: idPrestataire
 *         required: true
 *         description: Identifiant unique du prestataire (prestataire.id)
 *         schema:
 *           type: string
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     responses:
 *       '200':
 *         description: Liste des articles récupérée avec succès
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
 *                   prestataire_id:
 *                     type: string
 *                     format: uuid
 *                     example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *                   nom:
 *                     type: string
 *                     example: "T-shirt"
 *                   description:
 *                     type: string
 *                     example: "T-shirt de qualité"
 *                   prix:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   stock:
 *                     type: integer
 *                     example: 100
 *                   image:
 *                     type: string
 *                     example: "tshirt.jpg"
 *       '500':
 *         description: Erreur interne du serveur lors de la récupération des articles
 */
router.get("/prestataire/:idPrestataire", articlesController.getAllArticlesById);

/**
 * @swagger
 * /api/articles/prestataire:
 *   get:
 *     summary: Récupérer tous les articles de tous les prestataires
 *     description: Permet de récupérer la liste de tous les articles disponibles.
 *     tags:
 *       - Articles
 *     responses:
 *       '200':
 *         description: Liste des articles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/prestataire", articlesController.getAllArticles);

/**
 * @swagger
 * /api/articles/prestataire:
 *   post:
 *     summary: Créer un nouvel article pour un prestataire
 *     description: Permet à un prestataire de créer un nouvel article.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: article
 *         description: Données de l'article à créer
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - prestataire_id
 *             - nom
 *             - prix
 *             - stock
 *           properties:
 *             prestataire_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant du prestataire
 *               example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *             nom:
 *               type: string
 *               description: Nom de l'article
 *               example: "T-shirt"
 *             description:
 *               type: string
 *               description: Description de l'article
 *               example: "T-shirt de qualité"
 *             prix:
 *               type: number
 *               format: float
 *               description: Prix de l'article
 *               example: 19.99
 *             stock:
 *               type: integer
 *               description: Quantité disponible en stock
 *               example: 100
 *             image:
 *               type: string
 *               description: URL ou nom de l'image associée à l'article
 *               example: "tshirt.jpg"
 *     responses:
 *       '200':
 *         description: Article créé avec succès
 *       '400':
 *         description: Données invalides
 *       '500':
 *
 */
 router.post("/prestataire", sessionMiddleware.authVerif([2]), articlesController.saveArticle);

/**
 * @swagger
 * /api/articles/prestataire:
 *   put:
 *     summary: Modifier un article pour un prestataire
 *     description: Permet à un prestataire de modifier un article existant.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: article
 *         description: Données de l'article à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - prestataire_id
 *             - nom
 *             - prix
 *             - stock
 *           properties:
 *             id:
 *               type: integer
 *               description: Identifiant de l'article à mettre à jour
 *               example: 1
 *             prestataire_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant du prestataire
 *               example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *             nom:
 *               type: string
 *               description: Nom de l'article
 *               example: "T-shirt édition limitée"
 *             description:
 *               type: string
 *               description: Description de l'article
 *               example: "T-shirt en coton bio"
 *             prix:
 *               type: number
 *               format: float
 *               description: Prix de l'article
 *               example: 24.99
 *             stock:
 *               type: integer
 *               description: Quantité disponible en stock
 *               example: 80
 *             image:
 *               type: string
 *               description: URL ou nom de l'image
 *               example: "editionlimitee.jpg"
 *     responses:
 *       '200':
 *         description: Article mis à jour avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/prestataire", sessionMiddleware.authVerif([2]), articlesController.updateArticle);

/**
 * @swagger
 * /api/articles/prestataire/{idPresta}:
 *   delete:
 *     summary: Supprimer un article pour un prestataire
 *     description: Permet à un prestataire de supprimer un article existant en fournissant son identifiant.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPresta
 *         required: true
 *         description: Identifiant de l'article à supprimer
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       '200':
 *         description: Article supprimé avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/prestataire/:idPresta", sessionMiddleware.authVerif([2]), articlesController.deleteArticle);

/**
 * @swagger
 * /api/articles/prestataire/article/{idArticle}:
 *   get:
 *     summary: Récupérer un article par son identifiant
 *     description: Permet de récupérer un article spécifique en fournissant son identifiant.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: idArticle
 *         required: true
 *         description: Identifiant de l'article
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       '200':
 *         description: Article récupéré avec succès
 *       '404':
 *         description: Article non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/prestataire/article/:idArticle", articlesController.getArticleById);

/**
 * @swagger
 * /api/articles/cart:
 *   post:
 *     summary: Ajouter un article au panier
 *     description: Permet d'ajouter un article au panier d'un utilisateur.
 *     tags:
 *       - Articles / Panier
 *     parameters:
 *       - in: body
 *         name: panier
 *         description: Données de l'article à ajouter au panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - utilisateur_id
 *             - article_id
 *           properties:
 *             utilisateur_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             article_id:
 *               type: integer
 *               description: Identifiant de l'article
 *               example: 1
 *     responses:
 *       '200':
 *         description: Article ajouté au panier avec succès
 *       '400':
 *         description: Données invalides ou stock insuffisant
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/cart", articlesController.saveArticleToCart);

/**
 * @swagger
 * /api/articles/cart/{idUtilisateur}:
 *   get:
 *     summary: Récupérer le panier d’un utilisateur
 *     description: Permet de récupérer la liste des articles présents dans le panier d’un utilisateur donné.
 *     tags:
 *       - Articles / Panier
 *     parameters:
 *       - in: path
 *         name: idUtilisateur
 *         required: true
 *         description: Identifiant de l'utilisateur
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Panier récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/cart/:idUtilisateur", articlesController.getCart);

/**
 * @swagger
 * /api/articles/cart/increment:
 *   put:
 *     summary: Incrémenter la quantité d’un article dans le panier
 *     description: Permet d'augmenter la quantité d’un article présent dans le panier d’un utilisateur.
 *     tags:
 *       - Articles / Panier
 *     parameters:
 *       - in: body
 *         name: incrementData
 *         description: Données pour incrémenter la quantité d’un article dans le panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - cart_item_id
 *           properties:
 *             cart_item_id:
 *               type: integer
 *               description: Identifiant de l'entrée du panier à incrémenter
 *               example: 10
 *     responses:
 *       '200':
 *         description: Quantité incrémentée avec succès
 *       '400':
 *         description: Données invalides ou stock insuffisant
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/cart/increment", articlesController.incrementArticleInCart);

/**
 * @swagger
 * /api/articles/cart/decrement:
 *   put:
 *     summary: Décrémenter la quantité d’un article dans le panier
 *     description: Permet de diminuer la quantité d’un article dans le panier d’un utilisateur ou de le supprimer si la quantité devient nulle.
 *     tags:
 *       - Articles / Panier
 *     parameters:
 *       - in: body
 *         name: decrementData
 *         description: Données pour décrémenter la quantité d’un article dans le panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - cart_item_id
 *           properties:
 *             cart_item_id:
 *               type: integer
 *               description: Identifiant de l'entrée du panier à décrémenter
 *               example: 10
 *     responses:
 *       '200':
 *         description: Quantité décrémentée ou article retiré du panier avec succès
 *       '400':
 *         description: Données invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/cart/decrement", articlesController.decrementArticleInCart);

module.exports = router;
