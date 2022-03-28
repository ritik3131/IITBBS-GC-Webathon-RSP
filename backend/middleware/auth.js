module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.redirect("/");
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) res.redirect("/user/profile-page");
    else return next();
  },
  isAdmin: (req, res, next) => {
    if (req.session.isAdmin && req.user.role === "admin") return next();
    else res.redirect("/");
  },
};
