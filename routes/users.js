const express = require("express");
const router = express.Router();
const User = require("../models/Users"); //bringing in user-schema.

//to check and validate
const { body, validationResult } = require("express-validator");

//@route    POST   api/users
//@desc     Register a user
//access    Public
router.post(
  "/",
  [
    body("name", "Please enter name").not().isEmpty(),
    body("password", "Please enter password that is 6 character long").isLength({ min: 6 }),
    body('email','Please enter a valid email').isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('success');
    //body parser is required as middleware in server js.
  }
);

module.exports = router;
