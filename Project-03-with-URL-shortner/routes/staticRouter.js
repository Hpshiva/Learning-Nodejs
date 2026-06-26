const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (request, response) => {
  const allUrls = await URL.find({});
  return response.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (request, response) => {
  return response.render("signup");
});
router.get("/login", (request, response) => {
  return response.render("login");
});
module.exports = router;
