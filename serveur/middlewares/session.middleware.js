const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/users.services.pg");
const prestaService = require("../services/prestataires.services.pg");
const orgaService = require("../services/organisateurs.services.pg");

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

module.exports.signinUser = async (req, res) => {
    try {
        const users = await userService.getUsers();
        if (!users) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        let data = users.find(user => user.mail === req.body.email);
        if (req.body.password !== data.password) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
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
        if (req.body.password !== data.password) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
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
        if (req.body.password !== data.password) {
            return res.status(401).send({
                data: null,
                error: "Mot de passe incorrect!"
            });
        }
        let token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
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

module.exports.authVerif = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers['jwt-token'];
            console.log(req.headers['jwt-token'])
            if (token != null && token.length > 0) {
                //decode token
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                if (decodedToken != null) {
                    const users = await userService.getUsers();
                    let user = users.find(user => user.id === decodedToken.id);
                    console.log(user)
                    if (user) {
                        console.log('Authentification user réussie')
                        return next();
                    }
                    const prestas = await prestaService.getPrestataires();
                    let presta = prestas.find(presta => presta.id === decodedToken.id);
                    console.log(presta)
                    if (presta) {
                        console.log('Authentification presta réussie')
                        return next();
                    }
                    const orgas = await orgaService.getOrganisateurs();
                    let org = orgas.find(org => org.id === decodedToken.id);
                    console.log(org)
                    if (org) {
                        console.log('Authentification orga réussie')
                        return next();
                    }
                    console.log('Authentification échouée : utilisateur non trouvé')
                    res.status(401).json({error: 'Unauthorized'});
                }
            } else {
                console.log('Authentification échouée : aucun token');
                res.status(401).json({error: 'Unauthorized'});

            }
        } catch (error) {
            console.log('Authentification échouée : token invalide');
            res.status(401).json({error: error | 'Requête non authentifiée !'});
        }
    }
}