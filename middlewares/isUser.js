import User from "../models/User.js";

export const verifyExistingUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(409).json({
      success: false,
      message: "User already exists.",
      oldUser: user.email,
    });
  } else {
    next();
  }
};

export const isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden." });
  }
};
