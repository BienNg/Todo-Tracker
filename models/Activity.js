const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Activity Schema
const ActivitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = Activity = mongoose.model("activity", ActivitySchema);
