import { config } from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";

config();

const app = express();

let db;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
  return res.status(200).send(Date.now().toString());
});

app.get("/", (req, res) => {
  return res.render("index", { message: "" });
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  const isValid = await db
    .collection("users")
    .findOne({ username }, { projection: { password: 1 } })
    .then((result) => {
      return result && result.password === password ? true : false;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  if (isValid) {
    return res.render("index", { message: "Login succeeded" });
  } else {
    return res.render("index", { message: "Login failed" });
  }
});

const start = () => {
  const dbUrl = process.env.DB_URL;
  const dbName = process.env.DB_NAME;
  const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true };
  const dbClient = new MongoClient(dbUrl, dbOptions);
  dbClient
    .connect()
    .then(() => {
      db = dbClient.db(dbName);
      app.listen(process.env.PORT, () => {
        console.log("Server running on http://localhost:" + process.env.PORT);
      });
    })
    .catch((error) => {
      console.error(error);
      process.exit();
    });
};

start();
