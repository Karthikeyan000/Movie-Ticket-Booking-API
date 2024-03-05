module.exports = (app) => {
  // Package imports

  const express = require("express");

  const router = express.Router();

  // File imports

  const { verifyToken } = require("../middleware/auth");
  const { addOneLocation, getLocation } = require("../controllers/locationController");

  //addLocation api

  router.post("/locations", verifyToken, addOneLocation);

  router.get("/locations", verifyToken, getLocation);

  app.use("/api/v1", router);
};
