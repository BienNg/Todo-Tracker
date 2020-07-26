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
    .then((tasks) => res.json(tasks));
});

// @route   POST api/tasks
// @desc    Creates a task
// @access  Public
router.post("/", (req, res) => {
  const newTask = new Task({
    ...req.body,
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

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Public
router.put("/:id", (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, todo) => {
      if (err) return res.status(500).send(err);
      return res.send(todo);
    }
  );
});

module.exports = router;
