const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
async function handleUserSignUp(request, response) {
  const { name, email, password } = request.body;

  await User.create({
    name,
    email,
    password,
  });

  return response.render("/");
}

async function handleUserLogin(request, response) {
  const { email, password } = request.body;

  const user = await User.findOne({ email, password });
  if (!user)
    return response.render("login", {
      error: "Invalid Email or Password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  response.cookie("uid", sessionId);
  return response.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
