require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  DB_MONGO,
  JWT_SECRET
} = process.env;

module.exports = {
  env: NODE_ENV,
  port: PORT,
  dbMongo: DB_MONGO,
  jwtSecret: JWT_SECRET
};
