const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  stadt: String,
  kueche: String,
  bewertung_geschmack: Number,
  bewertung_preis: Number,
  bewertung_ambiente: Number,
  kommentar: String,
});

module.exports = mongoose.model("Foodspot", schema);
