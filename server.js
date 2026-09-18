const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./app/models");

const app = express();

dotenv.config();

// to support json format
app.use(bodyParser.json());

// db initialisation
db.sequelize
  .sync()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.error("Error syncing Database : ", err);
  });
require("./app/routes/users")(app);
require("./app/routes/theatre")(app);
require("./app/routes/location")(app);
require("./app/routes/showTime")(app);
require("./app/routes/movies")(app);
require("./app/routes/movie.show.detail")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
