import express from "express";

import env from "./utilities/env.js";

import router from "./routes/index.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const start = async () => {
  app.listen(env.port, () => {
    console.log("Server running on http://localhost:" + env.port);
  });
};

start();
