module.exports = (app) => {
  // Package imports

  const express = require("express");
  const router = express.Router();

  // File imports

  const { signUp, login } = require("../controllers/userController");


  router.post("/signUp", signUp);

  router.post("/login", login);

  app.use("/api/v1", router);
};
