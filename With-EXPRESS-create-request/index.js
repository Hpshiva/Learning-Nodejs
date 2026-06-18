// Import Express framework
const express = require("express");

// Create Express application
const app = express();

// Handle GET request for Home page
app.get("/", (req, res) => {

  // Send response to browser
  res.send("Home Page");
});

// Handle GET request for About page
app.get("/about", (req, res) => {

  // Send response to browser
  res.send("About Page");
});

// Start server on port 8000
app.listen(8000, () => {

  console.log("Server started on port 8000");
});