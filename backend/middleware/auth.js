const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Plz Login/Signup For Access All Our Resouorces" });
  }
  const data = jwt.verify(token, process.env.JWT_SECRETKEY);

  req.user = await User.findById(data.id);
  next();
};

//for admin access
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: `Role ${req.user.role} is not allow to access ` });
    }
    next();
  };
};
