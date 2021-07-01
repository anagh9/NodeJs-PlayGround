const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Hello World" });
});

app.get("/about", (req, res) => {
  res.render("pages/about", { title: "About Page" });
});

app.get("/user", (req, res) => {
  res.json({ message: true });
});

app.listen(5000, () => console.log("App running on https://localhost:5000"));
