const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/users.services.pg");
const prestaService = require("../services/prestataires.services.pg");
const orgaService = require("../services/organisateurs.services.pg");
const checkRole = require("../middlewares/checkRole.middleware")

module.exports.signinUser = async (req, res) => {
    try {
        const users = await userService.getUsers();
        if (!users) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        let data = users.find(user => user.mail === req.body.email);
        if (!data) {
            return res.status(401).send({
                data: null,
                error: "Utilisateur introuvable!"
            });
        }
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id, role: 1 }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 heures
        });
        data.token = token;
        res.status(200).json({
            error: 0,
            data: data
        });
    } catch(err) {
        res.status(500).send({ error: "ERREUR INTERNE" });
    }
};

module.exports.signinPresta = async (req, res) => {
    try {
        const prestas = await prestaService.getPrestataires();
        if (!prestas) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        let data = prestas.find(presta => presta.email === req.body.email);
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id, role: 2 }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 heures
        });
        data.token = token;
        res.status(200).json({
            error: 0,
            data: data
        });
    } catch(err) {
        res.status(500).send({ error: "ERREUR INTERNE" });
    }
};

module.exports.signinOrga = async (req, res) => {
    try {
        const orgs = await orgaService.getOrganisateurs();
        if (!orgs) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        let data = orgs.find(org => org.email === req.body.email);
        if (!bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id, role: 3 }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 heures
        });
        data.token = token;
        res.status(200).json({
            error: 0,
            data: data
        });
    } catch(err) {
        res.status(500).send({ error: "ERREUR INTERNE" });
    }
};

module.exports.authVerif = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['jwt-token'];
            if (token != null && token.length > 0) {
                //decode token
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                if (decodedToken != null) {
                    checkRole(decodedToken.role, roles)(req, res, next)
                    console.log('Authentification réussie')
                }
                console.log('Authentification échouée : utilisateur non trouvé')
                res.status(401).json({error: 'Unauthorized'});
            } else {
                console.log('Authentification échouée : aucun token');
                res.status(401).json({error: 'Unauthorized'});

            }
        } catch (error) {
            console.log('Authentification échouée : token invalide');
            res.status(401).json({ error: error.message || 'Requête non authentifiée !' });

        }
    }
}