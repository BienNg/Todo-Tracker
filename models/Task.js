const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Task Schema
const TaskSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  project: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    required: false,
  },
  priority: {
    type: Number,
    min: 0,
    max: 4,
  },
  tags: String,
});

module.exports = Task = mongoose.model("task", TaskSchema);
