let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let personSchema = new Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  address: String,
  postcode: String,
  mobile: String,
  homePhone: String,
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

module.exports = mongoose.model("Person", personSchema);
