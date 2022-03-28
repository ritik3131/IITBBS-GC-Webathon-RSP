const { generateToken } = require("../middleware/getToken");

exports.getCurrentUser = (req, res) => {
  if (!req.user) return res.status(200).json({error:true});
  const token = generateToken(req.user, req);
  res.status(200).json({token,error:false});
};
