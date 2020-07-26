const express = require("express");
const router = express.Router();

const Tracks = require("../../models/Track");

// @route   GET api/tracks
// @desc    Get all tracks
// @access  Public
router.get("/", (req, res) => {
  Tracks.find().then((tracks) => res.json(tracks));
});

// @route   POST api/tracks
// @desc    Creates a track
// @access  Public
router.post("/", (req, res) => {
  const newTrack = new Track({
    ...req.body,
  });
  newTrack.save().then((track) => res.json(track));
});

// @route   DELETE api/tracks/:id
// @desc    Delete a track
// @access  Public
router.delete("/:id", (req, res) => {
  Tracks.findById(req.params.id)
    .then((track) => track.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false, message: err }));
});

// @route   PUT api/tracks/:id
// @desc    Update a track
// @access  Public
router.put("/:id", (req, res) => {
  Tracks.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, track) => {
      if (err) return res.status(500).send(err);
      return res.send(track);
    }
  );
});

module.exports = router;
