const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // verify if for all informations have been send
    if (!(username, email, password)) {
      res.status(400).send({
        message: "All credentials fields are mandatory. Please retry.",
        success: false,
      });
    }

    // verify if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User already exists.", success: false });
    }

    // hash password
    const salt = await bcrypt.genSalt(10); // encryptment
    const hash = await bcrypt.hash(password, salt); // hash

    const newUser = new User({
      username,
      email,
      password: hash,
      role,
    });

    // generate a token for user's authentication
    const accessAuthToken = jwt.sign(
      { user_id: newUser.id, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    accessAuthToken.token = token;

    const refreshAuthToken = jwt.sign(
      { user_id: newUser.id, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    refreshAuthToken.token = token;

    // cookie not available to javascript
    res.cookie("jwt", refreshAuthToken, {
      httpOnly: true,
      max: 24 * 60 * 60 * 1000,
    });

    // creates a new user
    res.status(200).send({
      success: true,
      message: "New user created succesfully.",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verify if user exists
    if (!(email, password)) {
      return res
        .status(400)
        .json({ message: "Required email and password for login." });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      foundUser.token = token;
      return res.status(200).json({
        success: true,
        message: "User account have been found",
        foundUser,
        token,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
