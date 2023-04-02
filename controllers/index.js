import mongodb from "../utilities/mongodb.js";

const getHealthCheck = (req, res) => {
  return res.status(200).send(Date.now().toString());
};

const getLogin = (req, res) => {
  return res.render("index", { message: "" });
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const database = mongodb.use();
  const isValid = database
    ? await database
        .collection("users")
        .findOne({ username }, { projection: { password: 1 } })
        .then((result) => {
          return result && result.password === password ? true : false;
        })
        .catch((error) => {
          console.error(error);
          return false;
        })
    : false;
  if (isValid) {
    return res.render("index", { message: "Login succeeded" });
  } else {
    return res.render("index", { message: "Login failed" });
  }
};

export default { getHealthCheck, getLogin, postLogin };
