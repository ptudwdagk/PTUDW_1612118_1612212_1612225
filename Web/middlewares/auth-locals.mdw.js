module.exports = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;

        if (req.user.PhanHe == 2) {
            res.locals.isWriter = true;
        }
        if (req.user.PhanHe == 3) {
            res.locals.isEditer = true;
        }
        if (req.user.PhanHe == 4) {
            res.locals.isAdmin = true;
        }

    }

    next();
}