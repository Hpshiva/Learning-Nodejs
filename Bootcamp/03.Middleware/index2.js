import express from "express";
import morgan from "morgan";
const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(morgan('combined'))
app.listen(port, () => {
  console.log(`Listening on port ${port} `);
});
