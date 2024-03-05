const db = require("../models");
const {
  isRequiredResponse,
  unAuthorizedResponse,
  successResponse,
  successResponseWithMessage,
  notFoundResponse,
} = require("../utils/response.helper");

const Theatres = db.Theatres;

exports.addMovie = async (req, res) => {
  const movieName = req.body.movieName;
  const releaseDate = req.body.releaseDate;
  const userId = req.user.id;

  const userData = await db.Users.findOne({
    where: { id: userId },
  });

  if (!userData || userData.length == 0) {
    return res.json(unAuthorizedResponse("unIdentified User"));
  }

  if (userData.role != "ADMIN") {
    return res.json(
      unAuthorizedResponse("You Not Have Access for this Action")
    );
  }
  // checking theatreName request is exists
  if (!movieName || movieName.length == 0) {
    return res.json(isRequiredResponse("movieName is required"));
  }

  const data = {
    name: movieName,
    releaseDate
  };

  console.log(data," : data")

  const createMovie = await db.Movie.create(data);

  return res.json(
    successResponseWithMessage(createMovie, "Theatre Added Successfully")
  );
};

exports.getMovies = async (req, res) => {
  // find all Theatre data
  const findAllMoviesData = await db.Movie.findAll({
    include: [
      {
        model: db.MovieShowDetails,
        as: "movieShowDetail",
      },
    ],
  });

  res.json(successResponse(findAllMoviesData));
};
