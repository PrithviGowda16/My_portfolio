const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save(); // save to DB
    res.json({ msg: " Message saved successfully!" });
  } catch (err) {
    console.error(" Error saving message:", err.message);
    res.status(500).json({ msg: " Server Error - Could not save message" });
  }
});

module.exports = router;
