export const verifyExistingSubscriber = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  // for client user
  if (user) {
    res.status(409).json({
      success: false,
      message: "User already exists.",
      user: user,
    });
  } else {
    next();
  }
};

export const isSubscriberAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
