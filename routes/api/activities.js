const express = require("express");
const router = express.Router();

const Activity = require("../../models/Activity");

// @route   GET api/activities
// @desc    Get all activities
// @access  Public
router.get("/", (req, res) => {
  Activity.find()
    .sort({ date: -1 })
    .then((activities) => res.json(activities));
});

// @route   POST api/activities
// @desc    Creates a activity
// @access  Public
router.post("/", (req, res) => {
  console.log("activities router reached");
  const newActivity = new Activity({
    title: req.body.title,
    color: req.body.color,
  });
  newActivity.save().then((activity) => res.json(activity));
});

// @route   DELETE api/activities/:id
// @desc    Delete a activity
// @access  Public
router.delete("/:id", (req, res) => {
  Activity.findById(req.params.id)
    .then((activity) =>
      activity.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false, message: err }));
});

// @route   PUT api/activities/:id
// @desc    Update a activity
// @access  Public
router.put("/:id", (req, res) => {
  Activity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, activity) => {
      if (err) return res.status(500).send(err);
      return res.send(activity);
    }
  );
});

module.exports = router;
