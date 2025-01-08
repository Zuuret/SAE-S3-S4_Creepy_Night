exports.checkSession = (req, res, next) => {
    const session = req.query.session;
    if (!session) {
        return res.status(401).json({ error: "Session manquante ou invalide." });
    }

    // vérifications supplémentaires (ex : validation de l'identifiant de session en base de données / check role session).
    // ...

    console.log(`Session valide : ${session}`);
    next();
};
