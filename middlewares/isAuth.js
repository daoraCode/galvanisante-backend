import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extract token from header
    req.user = await jwt.verify(token, process.env.TOKEN_SECRET); // verify token
  console.log(req.user.id);
    next(); // move to the next function/middleware
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Authentication failed. Invalid token." });
  }
};
