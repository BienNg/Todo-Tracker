const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Activity Schema
const TrackSchema = new Schema({
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  activity: { type: String, required: true },
});

module.exports = Track = mongoose.model("track", TrackSchema);
