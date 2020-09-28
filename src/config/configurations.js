import { config } from 'dotenv';
config();

const envVars = process.env;

const configurations = Object.freeze({
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URL,
  databse: envVars.DATABSE,
  exchangeUri: envVars.EXCHANGE_URL,
})

export default configurations;