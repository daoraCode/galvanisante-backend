import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extract the token from header
    req.user = await jwt.verify(token, process.env.TOKEN_SECRET); // verify the token
    console.log(req.user);
    // move to the next function/middleware
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Authentication failed. Invalid token." });
  }
};
