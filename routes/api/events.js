const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Event = require("../../models/Event");

// @route    POST api/events
// @desc     Create an event
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty()
    ],
    [
      check("content", "content is required")
        .not()
        .isEmpty()
    ],
    [
      check("location", "location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newEvent = new Event({
        title: req.body.title,
        content: req.body.content,
        location: req.body.location,
        user: req.user.id,
        avatar: user.avatar,
        name: user.name
      });

      newEvent.attend.unshift({ user: req.user.id });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/events
// @desc     Get all events
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/events/:id
// @desc     Get event by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/events/:id
// @desc     Delete a event
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await event.remove();

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/events/attend/:id
// @desc     Attend an event
// @access   Private
router.put("/attend/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already marked as attending
    if (
      event.attend.filter(attend => attend.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Already attending this event" });
    }

    event.attend.unshift({ user: req.user.id });

    await event.save();

    res.json(event.attend);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/events/unattend/:id
// @desc     Unattend an event
// @access   Private
router.put("/unattend/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already marked as attending
    if (
      event.attend.filter(attend => attend.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Event already not attending" });
    }

    // Get remove index
    const removeIndex = event.attend
      .map(attend => attend.user.toString())
      .indexOf(req.user.id);

    event.attend.splice(removeIndex, 1);

    await event.save();

    res.json(event.attend);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
