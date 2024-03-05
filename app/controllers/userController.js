// package imports

const bcrypt = require("bcrypt");

//file imports
const db = require("../models/index");
const {
  isRequiredResponse,
  badRequestResponse,
  successResponse,
  alreadyExistsResponse,
  successResponseWithMessage,
} = require("../utils/response.helper");
const { userFindOne, userFindOneByMobile } = require("../utils/user.helper");
const generateToken = require("../utils/jwtToken");
const Enum = require("../utils/Enum");
const Location = db.Location;
const Users = db.Users;

exports.signUp = async (req, res) => {
  try {
    const { email, password, name, mobile, location, role } = req.body;

    if (role !== null || role != undefined) {
      role ? role : Enum.Moviegoers;
    }
    // checking email request is exists
    if (!email || email.length == 0) {
      return res.json(isRequiredResponse("email is required"));
    }

    // checking email already exists or not
    if (email) {
      const existingUser = await userFindOne(email);
      if (existingUser) {
        return res.json(alreadyExistsResponse("user email is already exists"));
      }
    }

    // checking password request is exists
    if (!password || password.length == 0) {
      return res.json(isRequiredResponse("password is required"));
    }

    // checking name request is exists
    if (!name || name.length == 0) {
      return res.json(isRequiredResponse("user name is required"));
    }

    // checking mobile request is exists
    if (!mobile || mobile.length == 0) {
      return res.json(isRequiredResponse("mobile Number is required"));
    }

    // checking mobile number already exists or not
    if (mobile) {
      const existingUser = await userFindOneByMobile(mobile);
      if (existingUser) {
        return res.json(
          alreadyExistsResponse("user mobile number is already exists")
        );
      }
    }

    // checking location request is exists
    if (role != "ADMIN") {
      if (!location || location.length == 0) {
        return res.json(isRequiredResponse("location is required"));
      }
    }
    let findLocationData;
    if (location) {
      findLocationData = await Location.findOne({
        where: { name: location },
      });
    }

    //  hashing passwords using bcrypt is essential for protecting user credentials
    let hashedPassword = await bcrypt.hash(password, 16);

    const data = {
      name,
      email,
      role: role,
      password: hashedPassword,
      locationId: findLocationData ? findLocationData.id : null,
      mobile,
      isDelete: false,
    };

    //creating a new user
    let newUser = await Users.create(data);

    return res.json(
      successResponseWithMessage(newUser, "Successfully Registered...")
    );
  } catch (error) {
    console.log(error);
    res.json(badRequestResponse("Error occurred while signing up"));
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.length == 0) {
    return res.json(isRequiredResponse("email is required"));
  }

  // checking password request is exists
  if (!password || password.length == 0) {
    return res.json(isRequiredResponse("password is required"));
  }

  const findUserData = await userFindOne(email);

  if (!findUserData) {
    return res.json(notFoundResponse("User Not Found..."));
  }

  const isMatch = await bcrypt.compare(password, findUserData.password);

  const token = generateToken(findUserData);

  //response
  const response = {
    id: findUserData.id,
    name: findUserData.name,
    role: findUserData.role,
    email: findUserData.email,
    mobile: findUserData.mobile,
  };

  if (!isMatch) {
    return res.json("Incorrect Password...");
  }

  return res.json({
    ...successResponseWithMessage(response),
    Token: token,
  });
};
