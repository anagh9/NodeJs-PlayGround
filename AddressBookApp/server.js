const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const url = require("url");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/AddressBook", { useNewUrlParser: true });

// Use EJS for templating
app.set("view engine", "ejs");

// Hold JS/CSS in public folder
app.use(express.static("public"));

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up method override
app.use(methodOverride("_method"));

const mockUserData = [{ name: "Anagh" }, { name: "Chaubey" }];

app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "successfully got users. Nice!",
    users: mockUserData,
  });
});

app.listen(8000, () => {
  console.log("Server is Running");
});
