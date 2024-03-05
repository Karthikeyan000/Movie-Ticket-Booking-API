module.exports = (app) => {
  // Package imports

  const express = require("express");
  const router = express.Router();

  // File imports

  const {
    getAllUpcomingMovies, addMovieShowToTheatre, getAllMovieShows, bookTicket,
  } = require("../controllers/movieShowController");
  const { verifyToken } = require("../middleware/auth");

  // routes

  router.get("/upComingMovies", verifyToken, getAllUpcomingMovies);
  router.post("/addMovieShowToTheatre/:movieId", verifyToken, addMovieShowToTheatre);
  router.get("/getAllMovieShows", verifyToken, getAllMovieShows);
  router.post("/bookTicket/:movieId", verifyToken, bookTicket);

  app.use("/api/v1", router);
};
