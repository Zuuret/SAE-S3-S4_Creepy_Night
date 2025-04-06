const express = require("express");
const router = express.Router();
const panierArticleController = require("../controllers/panierArticles.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

/**
 * @swagger
 * /api/panierArticles:
 *   post:
 *     summary: Ajouter un article au panier
 *     description: Permet d'ajouter un article dans le panier. Les données incluent l'identifiant, le prestataire associé, le nom, la description, le prix, le stock et l'image.
 *     tags:
 *       - Panier Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: panierArticle
 *         description: Données de l'article à ajouter dans le panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - prestataireId
 *             - nom
 *             - description
 *             - prix
 *             - stock
 *             - image
 *           properties:
 *             id:
 *               type: number
 *               example: 1
 *             prestataireId:
 *               type: string
 *               format: uuid
 *               example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *             nom:
 *               type: string
 *               example: "Article Exemple"
 *             description:
 *               type: string
 *               example: "Description de l'article"
 *             prix:
 *               type: number
 *               format: float
 *               example: 19.99
 *             stock:
 *               type: number
 *               example: 100
 *             image:
 *               type: string
 *               example: "image.jpg"
 *     responses:
 *       '200':
 *         description: Article ajouté au panier avec succès.
 *       '400':
 *         description: Données invalides.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.post("/",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.savePanierArticles);

/**
 * @swagger
 * /api/panierArticles:
 *   get:
 *     summary: Récupérer tous les articles du panier
 *     description: Permet de récupérer l'ensemble des articles présents dans le panier.
 *     tags:
 *       - Panier Articles
 *     responses:
 *       '200':
 *         description: Liste des articles du panier récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   prestataireId:
 *                     type: string
 *                     format: uuid
 *                     example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *                   nom:
 *                     type: string
 *                     example: "Article Exemple"
 *                   description:
 *                     type: string
 *                     example: "Description de l'article"
 *                   prix:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   stock:
 *                     type: number
 *                     example: 100
 *                   image:
 *                     type: string
 *                     example: "image.jpg"
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", panierArticleController.getPanierArticles);

/**
 * @swagger
 * /api/panierArticles/{uuid}:
 *   get:
 *     summary: Récupérer un article du panier par UUID
 *     description: Permet de récupérer un article spécifique dans le panier grâce à son identifiant. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'article dans le panier
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: Article récupéré avec succès.
 *       '404':
 *         description: Article non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.getPanierArticleById);

/**
 * @swagger
 * /api/panierArticles/{uuid}:
 *   put:
 *     summary: Mettre à jour un article du panier par UUID
 *     description: Permet de mettre à jour les informations d'un article dans le panier (ex. modification de la quantité, si applicable). (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'article du panier à mettre à jour
 *         schema:
 *           type: number
 *           example: 1
 *       - in: body
 *         name: panierArticle
 *         description: Données de l'article du panier à mettre à jour
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             prestataireId:
 *               type: string
 *               format: uuid
 *               example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *             nom:
 *               type: string
 *               example: "Article Exemple"
 *             description:
 *               type: string
 *               example: "Description modifiée"
 *             prix:
 *               type: number
 *               format: float
 *               example: 17.99
 *             stock:
 *               type: number
 *               example: 90
 *             image:
 *               type: string
 *               example: "nouvelle_image.jpg"
 *     responses:
 *       '200':
 *         description: Article du panier mis à jour avec succès.
 *       '404':
 *         description: Article non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.put("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.updatePanierArticles);

/**
 * @swagger
 * /api/panierArticles/{uuid}:
 *   delete:
 *     summary: Supprimer un article du panier par UUID
 *     description: Permet de supprimer un article du panier grâce à son identifiant. (Accès réservé aux rôles [1,2,3])
 *     tags:
 *       - Panier Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant de l'article dans le panier à supprimer
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       '200':
 *         description: Article supprimé du panier avec succès.
 *       '404':
 *         description: Article non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:uuid",  sessionMiddleware.authVerif([1,2,3]), panierArticleController.deletePanierArticles);

module.exports = router;
