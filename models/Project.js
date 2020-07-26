const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Project Schema
const ProjectSchema = new Schema({
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

module.exports = Project = mongoose.model("project", ProjectSchema);
