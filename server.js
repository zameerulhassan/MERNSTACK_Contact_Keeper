const express = require("express");
const connectDB = require("./config/db");
const { init } = require("./models/Users");
const app = express();
('express-validator');


//parsing body: middleware
//to accept body-data
app.use(express.json({extended:false}))

//connect DB
connectDB();
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to Contact keeper API..." })
);




//Define Routes
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
