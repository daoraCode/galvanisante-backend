import User from "../models/User";

export const isAdmin = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (req.user.isAdmin) {
    // if the req.user.isAdmin === true
    next();
  }
};
