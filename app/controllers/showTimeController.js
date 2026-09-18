const db = require("../models");
const {
  successResponseWithMessage,
  isRequiredResponse,
  unAuthorizedResponse,
  successResponse,
  alreadyExistsResponse,
  badRequestResponse,
} = require("../utils/response.helper");

const ShowTime = db.ShowTime;

exports.addShowTime = async (req, res) => {
  try {
    const { name, startTime, endTime } = req.body;
    const userId = req.user.id;

    //check user is Admin or not
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

    if (!name || !startTime || !endTime || name.length == 0) {
      return res.json(
        isRequiredResponse(" ShowTime name or StartTime or endTime is Missing")
      );
    }
    // find location data is Exists or not
    const findShowTimeData = await ShowTime.findOne({
      where: { name: name },
    });

    const data = {
      name: name,
      startTime,
      endTime,
    };

    if (findShowTimeData !== null && findShowTimeData !== undefined) {
        return res.json(alreadyExistsResponse("ShowTime Already Exists"));
    } else {
      const createShowTime = await ShowTime.create(data);
      return res.json(
        successResponseWithMessage(
          createShowTime,
          "Location Added Successfully"
        )
      );
    }
  } catch (error) {
    return res.json(badRequestResponse("Error Acquire in creating Location"));
  }
};

exports.getShowTime = async (req, res) => {
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
  const findAllLocationData = await ShowTime.findAll();

  return res.json(successResponse(findAllLocationData));
};
