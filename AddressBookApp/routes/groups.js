const express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let Person = require("../models/Person");
let Group = require("../models/Group");

router.get("/group/new", (req, res) => {
  res.render("group/new");
});
router.post("/group", async (req, res) => {
  let colour = hexToRgb(req.body.colour);

  // From: https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
  let luminance =
    (0.299 * colour.r + 0.587 * colour.g + 0.114 * colour.b) / 255;

  let fontColour = luminance > 0.5 ? "#000000" : "#FFFFFF";

  try {
    await Group.create({
      name: req.body.name,
      colour: req.body.colour,
      fontColour,
    });
    res.redirect("/");
  } catch (error) {
    return res.redirect("/error");
  }
});

router.get("/group/:id/edit", async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);
    res.render("group/edit", { group });
  } catch (error) {
    res.redirect("/error");
  }
});

router.put("/group/:id", async (req, res) => {
  let colour = hexToRgb(req.body.colour);

  let luminance =
    (0.299 * colour.r + 0.587 * colour.g + 0.114 * colour.b) / 255;

  let fontColour = luminance > 0.5 ? "#000000" : "#FFFFFF";

  try {
    await Group.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        colour: req.body.colour,
        fontColour,
      }
    );
    res.redirect("/");
  } catch (error) {
    res.redirect("/error");
  }
});

router.delete("/group/:id", async (req, res) => {
  let personPromise;

  if (req.query.deleteMembers) {
    // Delete all members with this group
    personPromise = Person.deleteMany({
      groups: mongoose.Types.ObjectId(req.params.id),
    });
  } else {
    // Remove group reference from people
    personPromise = Person.updateMany(
      { groups: req.params.id },
      { $pull: { groups: req.params.id } }
    );
  }

  try {
    await Promise.all([Group.deleteOne({ _id: req.params.id }), personPromise]);
    res.redirect("/");
  } catch (error) {
    res.redirect("/error");
  }
});

// from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

module.exports = router;
