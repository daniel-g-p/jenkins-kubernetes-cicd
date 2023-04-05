import env from "../utilities/env.js";

const getHealthCheck = (req, res) => {
  return res.status(200).send(Date.now().toString());
};

const getLogin = (req, res) => {
  return res.render("index", { message: "You are logged out" });
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const isValid =
    env.username &&
    env.password &&
    env.username === username &&
    env.password === password
      ? true
      : false;
  if (isValid) {
    return res.render("index", { message: "You are logged in" });
  } else {
    return res.render("index", { message: "You are logged out" });
  }
};

export default { getHealthCheck, getLogin, postLogin };
