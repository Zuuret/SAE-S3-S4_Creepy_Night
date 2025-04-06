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

/**
 * @swagger
 * /api/concerts/panier/{idUtilisateur}:
 *   get:
 *     summary: Récupérer le panier de concerts d’un utilisateur
 *     description: Permet de récupérer les concerts présents dans le panier d’un utilisateur.
 *     tags:
 *       - Concerts / Panier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUtilisateur
 *         required: true
 *         description: Identifiant de l'utilisateur
 *         schema:
 *           type: string
 *           format: uuid
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
 *                 properties:
 *                   panier_id:
 *                     type: integer
 *                     example: 5
 *                   nb_places_panier:
 *                     type: integer
 *                     example: 2
 *                   concert_id:
 *                     type: integer
 *                     example: 3
 *                   artiste:
 *                     type: string
 *                     example: "Silverman"
 *                   prix_place:
 *                     type: number
 *                     format: float
 *                     example: 20.00
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get("/panier/:idUtilisateur", sessionMiddleware.authVerif([1]), concertController.getPanierConcerts)

/**
 * @swagger
 * /api/concerts/panier:
 *   post:
 *     summary: Ajouter un concert au panier
 *     description: Permet d'ajouter des places pour un concert au panier d'un utilisateur. La route vérifie le stock disponible et met à jour le nombre de places dans le panier.
 *     tags:
 *       - Concerts / Panier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: panierData
 *         description: Données pour ajouter un concert au panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - utilisateur_id
 *             - concert_id
 *             - quantite
 *           properties:
 *             utilisateur_id:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             concert_id:
 *               type: integer
 *               description: Identifiant du concert
 *               example: 3
 *             quantite:
 *               type: integer
 *               description: Nombre de places à ajouter
 *               example: 2
 *     responses:
 *       '200':
 *         description: Concert ajouté au panier avec succès
 *       '400':
 *         description: Données invalides ou nombre de places insuffisant
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/panier", sessionMiddleware.authVerif([1]), concertController.postConcertInPanier);

/**
 * @swagger
 * /api/concerts/panier/decrementation:
 *   put:
 *     summary: Décrémenter le nombre de places dans le panier
 *     description: Permet de diminuer le nombre de places réservées dans le panier d'un utilisateur. Si le nombre de places devient 0, l'élément est supprimé du panier.
 *     tags:
 *       - Concerts / Panier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: decrementData
 *         description: Données pour décrémenter le nombre de places dans le panier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - panier_item_id
 *           properties:
 *             panier_item_id:
 *               type: integer
 *               description: Identifiant de l'entrée du panier à décrémenter
 *               example: 5
 *     responses:
 *       '200':
 *         description: Quantité décrémentée ou élément retiré du panier avec succès
 *       '400':
 *         description: Données invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/panier/decrementation", sessionMiddleware.authVerif([1]), concertController.decrementNbPlacesInPanier)

/**
 * @swagger
 * /api/concerts/panier/vider/{panier_item_id}:
 *   delete:
 *     summary: Vider un élément du panier
 *     description: Permet de retirer un concert du panier d'un utilisateur et de rétablir le stock de places pour le concert.
 *     tags:
 *       - Concerts / Panier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: panier_item_id
 *         required: true
 *         description: Identifiant de l'élément du panier à supprimer
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       '200':
 *         description: Concert retiré du panier et places rétablies dans le stock avec succès
 *       '400':
 *         description: Données invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.delete("/panier/vider/:panier_item_id", sessionMiddleware.authVerif([1]), concertController.viderPlacesInPanier)

module.exports = router;