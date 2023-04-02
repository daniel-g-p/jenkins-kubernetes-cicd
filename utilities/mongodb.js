import { MongoClient } from "mongodb";

import env from "./env.js";

let database;

const connect = async () => {
  const options = { useUnifiedTopology: true, useNewUrlParser: true };
  const client = new MongoClient(env.databaseUrl, options);
  return client
    .connect()
    .then(() => {
      database = client.db(env.databaseName);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const use = () => database;

export default { connect, use };
