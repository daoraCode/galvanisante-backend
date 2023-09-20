import User from "../models/User.js";

export const verifyExistingUser = async (req, res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    res.status(409).json({
      success: false,
      message: "Not found or already exists.",
      oldUser: existingEmail,
    });
  } else {
    next();
  }
};

export const isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(403).json({ error: 'Forbidden.' })
  }
}
