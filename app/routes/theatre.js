module.exports = (app) => {
  // Package imports

  const express = require("express");

  const router = express.Router();

  // File imports

  const {
    addTheatre,
    getTheatres,
  } = require("../controllers/theatreController");
  const { verifyToken } = require("../middleware/auth");

  router.post("/theatres", verifyToken, addTheatre);

  router.get("/theatres", verifyToken, getTheatres);

  app.use("/api/v1", router);
};
