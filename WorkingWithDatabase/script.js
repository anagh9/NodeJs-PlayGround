const express = require("express");
const mysql = require("mysql");
var app = express();

var connection = mysql.Connection({
  host: "localhost",
  user: "anagh",
  password: "anagh123",
  database: "sampledb",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});

app.get("/", (req, res) => {
  //about mysql
  // connection.query("")
});

app.listen(1337, "Connected to 1337 port");
