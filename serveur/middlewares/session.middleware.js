exports.checkSession = (req, res, next) => {

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
