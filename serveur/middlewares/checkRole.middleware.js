module.exports = (tokenRole, allowedRoles) => {
    return (req, res, next) => {
        if (!tokenRole) {
            return res.status(401).json({ message: req.t("middlewares.check_role.errors.authorization_error") });
        }

        if (!allowedRoles.includes(tokenRole)) {
            return res.status(403).json({ message: req.t("middlewares.check_role.errors.forbidding_error") });
        }

        return next();
    };
};