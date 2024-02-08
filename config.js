import { default as dotenv } from "dotenv";
import { cleanEnv, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  ACCESS_TOKEN: str(),
});
