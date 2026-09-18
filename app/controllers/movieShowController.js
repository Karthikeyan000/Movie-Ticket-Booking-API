const db = require("../models");
const {
  successResponseWithMessage,
  isRequiredResponse,
  unAuthorizedResponse,
  successResponse,
  alreadyExistsResponse,
  badRequestResponse,
  notFoundResponse,
} = require("../utils/response.helper");

const MovieShowDetails = db.MovieShowDetails;
const Movie = db.Movie;
exports.getAllUpcomingMovies = async (req, res) => {
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

  const currentDate = new Date();

  // find all location data
  const findAllUpcomingMovieData = await Movie.findAll({
    where: {
      releaseDate: { [db.Sequelize.Op.gt]: currentDate },
    },
  });

  return res.json(successResponse(findAllUpcomingMovieData));
};

exports.addMovieShowToTheatre = async (req, res) => {
  try {
    const movieId = req.params.movieId;
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

    const findMovieData = await Movie.findOne({
      where: {
        id: movieId,
      },
    });

    if (findMovieData == null || findMovieData == undefined) {
      return res.json(notFoundResponse("Movie Not Found"));
    }
    const findAllTheatreData = await db.Theatres.findAll();
    //find all showtime
    const findAllShowTimeData = await db.ShowTime.findAll();

    const diffBetweenStartDateAndEndDate =
      Math.abs(findMovieData.lastShowDate - findMovieData.releaseDate) /
      1000 /
      60 /
      60 /
      24;

    console.log(diffBetweenStartDateAndEndDate);

    let result = [];
    for (let i = 0; i < diffBetweenStartDateAndEndDate; i++) {
      //ticketDate means the show Date
      const ticketDate = findMovieData.releaseDate;
      // loop based on showTime
      for (const showTimeData of findAllShowTimeData) {
        if (showTimeData != null || showTimeData !== undefined) {
          //loop based on theatres
          for (const theatreData of findAllTheatreData) {
            if (theatreData !== null || theatreData !== undefined) {
              const movieShowData = {
                movieId,
                theatreId: theatreData.id,
                ticketDate: ticketDate,
                availableSeats: theatreData.availableSeats,
                createdBy: req.user.id,
                showTimeId: showTimeData.id,
              };
              const createMovieShow = await MovieShowDetails.create(
                movieShowData
              );
              result.push(createMovieShow);
              ticketDate.setDate(ticketDate.getDate() + 1);
            } else {
              continue;
            }
          }
        } else {
          continue;
        }
      }
    }
    return res.json(
      successResponseWithMessage(result, "Movie Successfully Scheduled")
    );
  } catch (error) {
    res.json(badRequestResponse("Error Acquire in Add Movie to Theatre"));
  }
};

exports.getAllMovieShows = async (req, res) => {
  const userId = req.user.id;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

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
  // find all location data
  const findAllMovieShowData = await MovieShowDetails.findAndCountAll({
    distinct: true,
    offset: page && pageSize ? (page - 1) * pageSize : null,
    limit: pageSize || null,
  });

  return res.json({
    ...successResponse(findAllMovieShowData.rows),
    page: page,
    totalCount: findAllMovieShowData.count,
  });
};

exports.bookTicket = async (req, res) => {
  const movieId = req.params.movieId;
  const totalSeats = req.query.totalSeats;
  const showTime = req.query.showTime;
  const findMovieData = await Movie.findOne({
    id: movieId,
  });

  if (!findMovieData) {
    return res.json(notFoundResponse("Movie Not Found"));
  }

  const findAllMovieShowData = await MovieShowDetails.findAll({
    where: {
      movieId: movieId,
    },
  });

  if (!findAllMovieShowData) {
    return res.json(notFoundResponse("Movie Show Not Found"));
  }

  showTime.toCapitalize();

  const findShowTimeData = await db.ShowTime.findOne({
    where: {
      name: showTime,
    },
  });
  const availableSeats =
    findAllMovieShowData.availableSeats +
    totalSeats -
    findAllMovieShowData.occupiedSeats;
  if (availableSeats <= 0) {
    return res.json(notFoundResponse("Tickets Not Available"));
  }

  const data = {
    occupiedSeats: occupiedSeats + totalSeats,
  };

  const updateMovieShowDetails = await MovieShowDetails.update(data);

  return res.json(successResponse(data));
};
