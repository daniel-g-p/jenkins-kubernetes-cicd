import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
  databaseName: process.env.DB_NAME,
};
