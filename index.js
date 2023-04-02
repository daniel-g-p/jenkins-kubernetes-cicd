import express from "express";

import env from "./utilities/env.js";
import mongodb from "./utilities/mongodb.js";

import router from "./routes/index.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const start = async () => {
  const databaseConnected = await mongodb.connect();
  if (databaseConnected) {
    app.listen(env.port, () => {
      console.log("Server running on http://localhost:" + env.port);
    });
  } else {
    process.exit();
  }
};

start();
