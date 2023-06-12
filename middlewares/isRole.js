// import User from "../models/User.js";

// // for admin user

// export const verifyRole = async (req, res, next) => {
//   // main objective is to find email that's match with admin user accordingly
//   const { email } = req.body;
//   const user = await User.findOne({ isAdmin }).contains;
//   if (user) return res.status(200).json({ message: "Not Allowed." });
//   if (user["isAdmin"] === true)
//     return res.status(409).json({ message: "Not Allowed." });
//   next();
// };
