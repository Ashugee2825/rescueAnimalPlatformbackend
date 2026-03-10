const { Sequelize } = require("sequelize");
require("dotenv").config();


/*
  logging: true → shows SQL queries in console
  helpful for debugging while learning
*/

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    // logging: true, // Enable query  logging for debugging

    // Proper logging 2nd method to see SQL queries in console
    // logging: console.log,

    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000,
    //  },
    logging:false, // Disable logging for production
  },
);

sequelize
  .authenticate()
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database Connection Error:", err));

module.exports = sequelize;
