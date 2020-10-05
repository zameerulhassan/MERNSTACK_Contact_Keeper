//this is part-2 of log in process
// once we get token from routes/auth.js

//{
//@route    POST   api/auth
//@desc     Auth user and get token (part 1 of log in, part 2 is in auth middle ware)
//access    Public
//}

//we will send the token into request-header through this middleware, then verify with our records.
//this function simple verifies the token and ultimately authroises the user to log
//to log in we will use
//{
//@route    GET   api/auth
//@desc     Get logged in user
//access    Private
//router.get("/", (req, res) => {
//    res.send("Get logged in user");
//  });
//}

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  //checking incoming request whether it has token or not
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token: Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //if it is verified, payload is put into decoded.
    //take user out from this.
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token in not valid" });
  }
};
