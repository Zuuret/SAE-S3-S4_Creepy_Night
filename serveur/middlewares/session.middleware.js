const User = require('../controllers/users.controller');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.checkSession = (req, res, next) => {

    // Supposition que le front-end envoie l'identifiant de session
    // obtenu lors de l'authentification, via la partie query de l'URL
    // Code à supprimer une fois le front-end en place et qui envoie l'identifiant de session
    if (!req.query.session) {
        req.query.session = "12abc45-953-cfb12";
    }
    // Fin du code à supprimer


    const session = req.query.session;
    if (!session) {
        return res.status(401).json({ error: "Session manquante ou invalide." });
    }

    // vérifications supplémentaires (ex : validation de l'identifiant de
    // session en base de données / check role session).
    // ...

    console.log(`Session valide : ${session}`);
    next();
};

module.exports.signin = (req, res) => {
    User.getUserById(req, res)
        .then(user => {
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    error: "Mot de passe incorrect!"
                });
            }
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                // expiresIn: 86400 // 24 heures
                expiresIn: 600*2 // 20 minutes
            });
            res.status(200).send({
                id: user.id,
                username: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};