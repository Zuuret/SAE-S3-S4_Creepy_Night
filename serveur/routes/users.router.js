const express = require("express");
const userController = require("../controllers/users.controller");
const sessionMiddleware = require("../middlewares/session.middleware");

var router = express.Router();


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Utilisé pour créer un nouvel utilisateur
 *     tags:
 *       - utilisateurs
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Données de l'utilisateur pour créer un nouvel utilisateur
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - firstname
 *             - birthdate
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Doe
 *               description: Nom
 *             firstname:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: John
 *               description: Prénom
 *             birthdate:
 *               type: string
 *               format: date
 *               example: 2000-01-01
 *               description: Date de naissance
 *             email:
 *               type: string
 *               minLength: 5
 *               maxLength: 55
 *               example: johndoe@example.com
 *               description: Adresse mail
 *             password:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: mdp
 *               description: Mot de passe
 *     responses:
 *       '200':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/", userController.saveUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Permet de récupérer la liste de tous les utilisateurs.
 *     tags:
 *       - utilisateurs
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs récupérée avec succès.
 *       '500':
 *         description: Erreur interne du serveur.
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/users/{uuid}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Récupère un utilisateur par son UUID
 *     tags:
 *       - utilisateurs
 *     parameters:
 *       - in: path
 *         name: uuid
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *           example: 5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6
 *           description: UUID de l'utilisateur
 *           required: true
 *           format: uuid
 *           minLength: 36
 *           maxLength: 36
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '404':
 *         description: Utilisateur non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.get('/:uuid',  sessionMiddleware.authVerif([1,2,3]), userController.getUserById);



/**
 * @swagger
 * /api/users/{uuid}:
 *   put:
 *     summary: Modifier un utilisateur par ID
 *     description: Modifie un utilisateur existant par son UUID
 *     tags:
 *       - utilisateurs
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *           format: uuid
 *           minLength: 36
 *           maxLength: 36
 *           example: 5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6
 *           description: UUID de l'utilisateur
 *           required: true
 *       - in: body
 *         name: user
 *         description: Données de l'utilisateur à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: Doe
 *               description: Nom
 *               required: true
 *             firstname:
 *               type: string
 *               minLength: 2
 *               maxLength: 50
 *               example: John
 *               description: Prénom
 *               required: true
 *             birthdate:
 *               type: string
 *               format: date
 *               example: 2000-01-01
 *               description: Date de naissance
 *               required: true
 *             email:
 *               type: string
 *               minLength: 5
 *               maxLength: 55
 *               example: johndoe@example.com
 *               description: Adresse mail
 *               required: true
 *               unique: true
 *             password:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: mdp
 *               description: Mot de passe
 *               required: true
 *               unique: true
 *             is_festivalier:
 *               type: boolean
 *               example: true
 *               description: Est festivalier
 *               required: true*
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour
 *       '404':
 *         description: Utilisateur non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put('/:uuid',  sessionMiddleware.authVerif([1,3]), userController.updateUser);


/**
 * @swagger
 * /api/users/{uuid}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     description: Supprime un utilisateur par son UUID
 *     tags:
 *       - utilisateurs
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *           format: uuid
 *           minLength: 36
 *           maxLength: 36
 *           example: 5fbd1d86-3e25-461a-be8d-bbbd9d5d94f6
 *           description: UUID de l'utilisateur
 *           required: true
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:uuid',  sessionMiddleware.authVerif([1,3]), userController.deleteUser);
/*
router.delete('/:uuid', async (req, res) => {
 const { uuid } = req.params;
 try {
  const result = await userController.deleteUser(uuid);
  if (!result) {
   return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  res.json({ message: 'Utilisateur supprimé avec succès' });
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
 }
});
// VERIF
*/
module.exports = router;