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
 *             - email
 *             - phone
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               minLength: 5
 *               maxLength: 50
 *               example: John Doe
 *             email:
 *               type: string
 *               minLength: 5
 *               maxLength: 45
 *               example: johndoe@example.com
 *             phone:
 *               type: string
 *               minLength: 7
 *               maxLength: 10
 *               example: -337777777
 *             password:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: mdp
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */


module.exports = router;