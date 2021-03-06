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

//@route    POST   api/users
//@desc     Register a user
//access    Public
router.post(
  "/",
  [
    body("name", "Please enter name").not().isEmpty(),
    body(
      "password",
      "Please enter password that is 6 character long"
    ).isLength({ min: 6 }),
    body("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //=email:email
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
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
