const jwt = require("jsonwebtoken");
const db = require("../models");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ status: 403, message: "Invalid token" });
      } else if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ status: 403, message: "Token has expired" });
      } else {
        return res
          .status(500)
          .json({ status: 500, message: "Internal Server Error" });
      }
    }

    req.user = decoded;
    next();
  });
};

