const express = require("express");
const sessionMiddleware = require("../middlewares/session.middleware");

var router = express.Router();


router.post('/user', sessionMiddleware.signinUser);

router.post('/presta', sessionMiddleware.signinPresta);

router.post('/orga', sessionMiddleware.signinOrga);

module.exports = router;