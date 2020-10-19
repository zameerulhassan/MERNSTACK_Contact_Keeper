const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const { init } = require("./models/Users");
const app = express();
("express-validator");

//parsing body: middleware
//to accept body-data
app.use(express.json({ extended: false }));

//connect DB
connectDB();

//Define Routes
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

//Serve static assest in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
