const express = require("express");
const router = express.Router();
const User = require("../models/Users"); //bringing in user-schema.
const bcrypt = require("bcryptjs");
//to check and validate
const { body, validationResult } = require("express-validator");
const { genSalt } = require("bcryptjs");

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
      res.send("user saved");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
