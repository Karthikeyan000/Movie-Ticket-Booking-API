require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// database configuration's

module.exports = {
  HOST: "dpg-cnjlkoacn0vc738e2n90-a",
  USER: "ticketbooking",
  PASSWORD: "1x5DEA3DFfTdL4i4tBTNaF0ZBYlqdeF6",
  DB: "ticketbooking",
  dialect: "postgres",
};
