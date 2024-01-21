const express = require("express");

const { login, signup, profile } = require("../controller/userController");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

// router.get('/profile', profile)

module.exports = router;
export {};
