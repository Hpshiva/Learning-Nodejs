const User = require("../models/user");

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

  return response.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
