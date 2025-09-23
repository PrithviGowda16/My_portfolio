const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); 

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use("/api/contact", require("../routes/contact"));
app.use("/api/auth", require("../routes/auth"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("*** MongoDB Connected ***"))
  .catch(err => console.error("** MongoDB Connection Error **:", err.message));

module.exports = app; // 👈 important for Vercel
