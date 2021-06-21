const express = require("express");
const app = express();

const path = require("path");
require("dotenv").config();
let url = require("url");

let mongoose = require("mongoose");

// "mongodb://localhost/Adressbook";
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("error");
});

app.listen(1337, () => {
  console.log("Server Runnin on Port 1337 ");
});
