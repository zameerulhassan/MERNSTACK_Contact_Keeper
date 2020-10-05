const express = require("express");
const router = express.Router();

const User = require("../models/Users"); //bringing in user-schema.
const bcrypt = require("bcryptjs");
//bring JWK
const jwt = require("jsonwebtoken");
//to get jwtSecret
const config = require("config");

//to check and validate
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//@route    GET   api/auth
//@desc     Get logged in user
//access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST   api/auth
//@desc     Auth user and get token (part 1 of log in, part 2 is in auth middle ware)
//access    Public
router.post(
  "/",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credential" });
      }
      const isMarch = await bcrypt.compare(password, user.password);
      if (!isMarch) {
        return res.status(400).json({ msg: "Invalid credential" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
