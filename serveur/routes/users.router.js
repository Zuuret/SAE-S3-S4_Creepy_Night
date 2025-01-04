const express = require("express");
const userController = require("../controllers/users.controller");
//const userMiddleware = require("../middlewares/users.middleware");

var router = express.Router();

// VERIF
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               est_festivalier:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Paramètres invalides
 */
router.post("/", userController.saveUser);

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Récupère un utilisateur par son UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:uuid', async (req, res) => {
    console.log(req.params.uuid);
    try {
        await userController.getUserById(req, res);
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Modifier un utilisateur par ID
 *     description: Modifie un utilisateur existant par son UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               est_festivalier:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:uuid', async (req, res) => {
 const { uuid } = req.params;
 const { name, firstname, birthdate, email, password, est_festivalier } = req.body;
 try {
  const result = await userService.updateUser(uuid, name, firstname, birthdate, email, password, est_festivalier);
  if (!result) {
   return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }
  res.json(result);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
 }
});

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     description: Supprime un utilisateur par son UUID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: L'UUID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:uuid', async (req, res) => {
 const { uuid } = req.params;
 try {
  const result = await userService.deleteUser(uuid);
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

 /**
 * @swagger
 * /api/users:
 *   post:
 *     description: Used to create a new user
 *     tags:
 *       - users
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User data to create a new user
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
 *             password:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: mdp
 *               description: Mot de passe
 *               required: true
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */


module.exports = router;