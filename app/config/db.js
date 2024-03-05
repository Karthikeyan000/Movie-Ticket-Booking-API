require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// database configuration's

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
};
