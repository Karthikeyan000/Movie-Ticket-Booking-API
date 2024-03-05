module.exports = (app) => {
  // Package imports

  const express = require("express");
  const router = express.Router();

  // File imports

  const { verifyToken } = require("../middleware/auth");
  const {
    addShowTime,
    getShowTime,
  } = require("../controllers/showTimeController");
  

  router.post("/showTime", verifyToken, addShowTime);

  router.get("/showTime", verifyToken, getShowTime);

  app.use("/api/v1", router);
};
