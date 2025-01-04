const express = require("express");
const userController = 
        require("../controllers/users.controller");
//const userMiddleware = require("../middlewares/users.middleware");

var router = express.Router();

router.post("/",userController.saveUser);
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