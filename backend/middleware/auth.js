module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect(process.env.FRONTEND_HOST);
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) res.redirect(process.env.FRONTEND_HOST);
    else return next();
  },
  isAdmin: (req, res, next) => {
    if (req.session.isAdmin && req.user.role === "admin") return next();
    else res.redirect(process.env.FRONTEND_HOST);
  },
};
