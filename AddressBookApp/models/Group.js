const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema({
  name: String,
  colour: String,
  fontColour: String,
});

module.exports = mongoose.model("Group", groupSchema);
