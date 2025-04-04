module.exports = (tokenRole, allowedRoles) => {
    if (!tokenRole) {
        return { message: "middlewares.check_role.errors.authorization_error" };
    }
    if (!allowedRoles.includes(tokenRole)) {
        return { message: "middlewares.check_role.errors.forbidding_error" };
    }
};