const { getMovies, addMovie } = require("../controllers/movieController");

module.exports = (app) => {
  // Package imports

  const express = require("express");

  const router = express.Router();

  // File imports

  const {
    addMovie,
    getMovies,
  } = require("../controllers/movieController");
  const { verifyToken } = require("../middleware/auth");
  //signUp api

  router.post("/movies", verifyToken, addMovie);

  router.get("/movies", verifyToken, getMovies);

  app.use("/api/v1", router);
};
