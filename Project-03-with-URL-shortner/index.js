const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const restrictToLoggedInUserOnly = require("./middleware/auth");
const { connectToMongoDB } = require("./connection");
const PORT = 8001;

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

// connection to mongo
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log("Error ", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/testing", async (request, response) => {
  const allUrls = await URL.find({});
  return response.render("home", {
    urls: allUrls,
  });
});

app.get("/:shortId", async (request, response) => {
  const shortId = request.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  response.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT -> ${PORT}`));
