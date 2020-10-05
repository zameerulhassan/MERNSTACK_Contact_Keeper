const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/Users"); //bringing in user-schema.
const Contact = require("../models/Contacts"); //bringing in contact-schema.
const auth = require("../middleware/auth");

//@route    GET   api/contacts
//@desc     Get all users contacts
//access    Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST   api/contacts
//@desc     Add new contact
//access    Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

//@route    PUT   api/contacts/:id
//@desc     Update contact
//access    Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@route    DELETE   api/contacts/:id
//@desc     Delete contact
//access    Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});
module.exports = router;
