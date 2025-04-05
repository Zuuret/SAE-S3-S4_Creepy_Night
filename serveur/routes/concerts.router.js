const express = require("express");
const concertController = require("../controllers/concerts.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/concerts:
 *   post:
 *     summary: Créer un nouveau concert
 *     description: Utilisé pour créer un nouveau concert
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: body
 *         name: concert
 *         description: Données du concert pour créer un nouveau concert
 *         schema:
 *           type: object
 *           required:
 *             - artiste
 *             - nationalite
 *             - date
 *             - heure
 *             - categorie
 *             - scene
 *           properties:
 *             artiste:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Silverman
 *               description: nom artiste
 *             nationalite:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Espagnole
 *               description: nationalité
 *             date:
 *               type: string
 *               format: date
 *               example: 2025-10-27
 *               description: Date du concert
 *             heure:
 *               type: string
 *               minLength: 8
 *               maxLength: 8
 *               example: 23:00:00
 *               description: heure
 *             categorie:
 *              type: string
 *              minLength: 3
 *              maxLength: 33
 *              example: Jersey
 *             scene:
 *              type: string
 *              minLength: 3
 *              maxLength: 20
 *              example: grande scene
 *     responses:
 *       '200':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/",  sessionMiddleware.authVerif([1,2,3]), concertController.saveConcert);



/**
 * @swagger
 * /api/concerts:
 *   get:
 *     summary: Récupérer tous les concerts
 *     description: Permet de récupérer la liste de tous les concerts.
 *     tags:
 *       - concerts
 *     responses:
 *       '200':
 *         description: Liste des concerts récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", concertController.getConcerts);

/**
 * @swagger
 * /api/concerts/{id}:
 *   get:
 *     summary: Récupérer un concert par ID
 *     description: Permet de récupérer les informations d'un concert grâce à son ID.
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du concert
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Concert récupéré avec succès.
 *       '404':
 *         description: Concert non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/:uuid", concertController.getConcertById);

/**
 * @swagger
 * /api/concerts/{id}:
 *   put:
 *     summary: Modifier un concert par ID
 *     description: Modifie un concert existant par son ID
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du concert
 *         schema:
 *           type: string
 *           format: id
 *           minLength: 1
 *           maxLength: 5
 *           example: 3
 *           description: ID du concert
 *           required: true
 *       - in: body
 *         name: concert
 *         description: Données du concert à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             artiste:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Doe
 *               description: Nom d'artiste
 *               required: true
 *             nationalite:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Francais
 *               description: nationalite
 *               required: true
 *             date:
 *               type: string
 *               format: date
 *               example: 2000-01-01
 *               description: Date du concert
 *               required: true
 *             heure:
 *               type: string
 *               minLength: 5
 *               maxLength: 8
 *               example: 22:00:00
 *               description: heure de début
 *               required: true
 *             categorie:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: RAP
 *               description: genre
 *               required: true
 *               unique: true
 *             scene:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: Grande scene
 *               description: où se joue
 *               required: true
 *     responses:
 *       '200':
 *         description: concert mis à jour
 *       '404':
 *         description: concert non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/:id",  sessionMiddleware.authVerif([1,2,3]), concertController.updateConcert);

/**
 * @swagger
 * /api/concerts/{id}:
 *   delete:
 *     summary: Supprimer un concert
 *     description: Permet de supprimer un concert existant grâce à son ID.
 *     tags:
 *       - concerts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du concert
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Concert supprimé avec succès.
 *       '404':
 *         description: Concert non trouvé.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.delete("/:id",  sessionMiddleware.authVerif([1]), concertController.deleteConcert);

router.get("/panier/:idUtilisateur", sessionMiddleware.authVerif([1]), concertController.getPanierConcerts)

router.post("/panier", sessionMiddleware.authVerif([1]), concertController.postConcertInPanier);

router.put("/panier/decrementation", sessionMiddleware.authVerif([1]), concertController.decrementNbPlacesInPanier)

router.delete("/panier/vider/:panier_item_id", sessionMiddleware.authVerif([1]), concertController.viderPlacesInPanier)

module.exports = router;