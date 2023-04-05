import { config } from "dotenv";

config();

export default {
  nodeEnv: process.env.NODE_ENV || "production",
  port: process.env.NODE_PORT || 3000,
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
};
