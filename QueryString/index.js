const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const api = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
