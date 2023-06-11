import User from "../models/User.js";

// will allow us to check if user already in db with the defined email
export const verifyExistingUser = async (req, res, next) => {
  const { email } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    res.status(409).json({
      success: false,
      message: "User already exists.",
      user: oldUser,
    });
  } else {
    next();
  }
};

// resources and private documents are allowed only for admin
// this middleware will grant access to every operations on db
export const isAdminAuthentified = await (req, res, next) => {

  const { email } = req.body;
  const userAdmin = await User.findOne({ email })

  if (reqq.user) {
    next()
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
