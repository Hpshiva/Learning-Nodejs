import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});
app.listen("8000", () => {
  console.log("Server Started at 8000");
});
