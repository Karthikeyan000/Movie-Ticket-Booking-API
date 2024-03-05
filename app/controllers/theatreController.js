const db = require("../models");
const {
  isRequiredResponse,
  unAuthorizedResponse,
  successResponse,
  successResponseWithMessage,
  notFoundResponse,
} = require("../utils/response.helper");

const Theatres = db.Theatres;

exports.addTheatre = async (req, res) => {
  const theatreName = req.body.theatreName;
  const location = req.body.location;
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
  if (!theatreName || theatreName.length == 0) {
    return res.json(isRequiredResponse("theatreName is required"));
  }

  // checking location request is exists
  if (!location || location.length == 0) {
    return res.json(isRequiredResponse("location is required"));
  }
  location.toLowerCase();
  const findLocationData = await Location.findOne({
    where: {
      name: location,
    },
  });
  if (findLocationData == null || findLocationData == undefined) {
    return res.json(notFoundResponse("location is not Found"));
  }
  const data = {
    name: theatreName,
    locationId: findLocationData.id,
  };

  const createTheatre = await Theatres.create(data);

  return res.json(
    successResponseWithMessage(createTheatre, "Theatre Added Successfully")
  );
};

exports.getTheatres = async (req, res) => {
  // find all Theatre data
  const findAllTheatreData = await Theatres.findAll({
    include:[{
        model:db.MovieShowDetails,
        as:"movieShowDetail"
    }]
  });

  res.json(successResponse(findAllTheatreData));
};
