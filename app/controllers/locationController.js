const db = require("../models");
const {
  successResponseWithMessage,
  isRequiredResponse,
  unAuthorizedResponse,
  successResponse,
  alreadyExistsResponse,
  badRequestResponse,
} = require("../utils/response.helper");

const Location = db.Location;

exports.addOneLocation = async (req, res) => {
  try {
    const locationName = req.query.locationName;
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

    if (!locationName || locationName.length == 0) {
      res.json(isRequiredResponse("Location is Required"));
    }
    // find location data is Exists or not
    const findLocationData = await Location.findOne({
      where: { name: locationName },
    });

    if (findLocationData !== null && findLocationData !== undefined) {
      res.json(alreadyExistsResponse("Location Already Exists"));
    } else {
      locationName.toLowerCase();
      const createLocation = await Location.create({ name: locationName });
      res.json(
        successResponseWithMessage(
          createLocation,
          "Location Added Successfully"
        )
      );
    }
  } catch (error) {
    return res.json(badRequestResponse("Error Acquire in creating Location"));
  }
};

exports.getLocation = async (req, res) => {
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
  // find all location data
  const findAllLocationData = await Location.findAll();

  return res.json(successResponse(findAllLocationData));
};
