const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 5000;

const db = new sqlite3.Database("./employee.db");

app.get("/", (req, res) => {
  res.send("<center><h1>Welcome Here CRUD Operation</h1></center>");
});

// Create
app.get("/add/:id/:name", function (req, res) {
  db.serialize(() => {
    // db.run("CREATE TABLE emp(id INT,name TEXT)");
    db.run(
      "INSERT INTO emp(id,name) VALUES(?,?)",
      [req.params.id, req.params.name],
      function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New employee has been added");
        res.send(
          "New employee has been added into the database with ID = " +
            req.params.id +
            " and Name = " +
            req.params.name
        );
      }
    );
  });
});

// READ
app.get("/view/:id", function (req, res) {
  db.serialize(() => {
    db.each(
      "SELECT id ID, name NAME FROM emp WHERE id =?",
      [req.params.id],
      function (err, row) {
        //db.each() is only one which is funtioning while reading data from the DB
        if (err) {
          res.send("Error encountered while dislaying");
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
        console.log("Entry dislayed successfully");
      }
    );
  });
});

//UPDATE
app.get("/update/:id/:name", function (req, res) {
  db.serialize(() => {
    db.run(
      "UPDATE emp SET name = ? WHERE id = ?",
      [req.params.name, req.params.id],
      function (err) {
        if (err) {
          res.send("Error encountered while updating");
          return console.error(err.message);
        }
        res.send("Entry updated successfully");
        console.log("Entry updated successfully");
      }
    );
  });
});

// DELETE
app.get("/del/:id", function (req, res) {
  db.serialize(() => {
    db.run("DELETE FROM emp WHERE id = ?", req.params.id, function (err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }
      res.send("Entry deleted");
      console.log("Entry deleted");
    });
  });
});

// Closing the database connection.
app.get("/close", function (req, res) {
  db.close((err) => {
    if (err) {
      res.send("There is some error in closing the database");
      return console.error(err.message);
    }
    console.log("Closing the database connection.");
    res.send("Database connection successfully closed");
  });
});

app.listen(PORT, () => console.log(`App Running on ${PORT}`));
