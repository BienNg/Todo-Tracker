const express = require("express");
const router = express.Router();

// Tasks Model
const Task = require("../../models/Task");

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get("/", (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route   POST api/tasks
// @desc    Creates a task
// @access  Public
router.post("/", (req, res) => {
  const newTask = new Task({
    title: req.body.title,
  });
  newTask.save().then((task) => res.json(task));
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
