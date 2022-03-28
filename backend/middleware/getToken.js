const jwt = require("jsonwebtoken");

exports.generateToken = (newUser, req) => {
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.mailId,
        name: newUser.name,
        isAdmin: req.session.isAdmin,
      },
      process.env.SCERET_KEY,
      { expiresIn: "5h" }
    );
    return token;
  };