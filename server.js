const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, "public"))); // serve frontend
app.use(express.json()); // parse JSON from forms

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/contact", require("./routes/contact")); // your contact form
app.use("/api/auth", require("./routes/auth")); //  authentication routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("*** MongoDB Connected ***"))
  .catch(err => console.error("** MongoDB Connection Error **:", err.message));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));