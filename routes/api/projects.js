const express = require("express");
const router = express.Router();

const Project = require("../../models/Project");

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects));
});

// @route   POST api/projects
// @desc    Creates a project
// @access  Public
router.post("/", (req, res) => {
  console.log("projects router reached");
  const newProject = new Project({
    title: req.body.title,
    color: req.body.color,
  });
  newProject.save().then((project) => res.json(project));
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Public
router.delete("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => project.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Public
router.put("/:id", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, project) => {
      if (err) return res.status(500).send(err);
      return res.send(project);
    }
  );
});

module.exports = router;
