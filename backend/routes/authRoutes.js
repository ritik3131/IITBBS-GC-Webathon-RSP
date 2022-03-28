const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const { getCurrentUser } = require("../controller/authController");
const router = express.Router();
dotenv.config();
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get('/login/user',getCurrentUser);

router.get(
  "/login/google",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_HOST,
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    console.log(err);
 });
  req.logout();
  res.redirect( process.env.FRONTEND_HOST);
});
module.exports = router;