const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Task Schema
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  note: String,
  project: String,
  priority: {
    type: Number,
    min: 0,
    max: 4,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
