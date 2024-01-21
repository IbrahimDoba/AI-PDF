const bcrypt = require("bcrypt");
const User = require("../schema/userModel");
const express = require("express");
const { Router } = express;
// const { Request, Response, response } = express;
const router = Router();
const { createTokens, validateToken } = require("../src/JWT");
// const cookieParser = require ("cookie-parser")

// AUTH ROUTES
const login = async (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  const user = await User.findOne({ username: username });
  // console.log(user)
  if (!user) {
    res.status(400).json({ error: "user does not exist" });
  }
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match: any) => {
    if (!match) {
      res.status(400).json({ error: "Incorrect Username or Password" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true, // for security to prevent others from accessing your cookies
      });

      res.json("logged In");
    }
  });
};
const signup = (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  bcrypt.hash(password, 10).then((hash: any) => {
    User.create({
      username: username,
      password: hash,
    });
    console.log("Hashed Password:", hash);
  });
  res.json("ggs");
};
router.get("/profile", validateToken, (req: any, res: any) => {
  res.json("profile");
});

module.exports = {
  login,
  signup,
};

export {};
