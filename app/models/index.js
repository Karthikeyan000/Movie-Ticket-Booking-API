const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./user/users.js")(sequelize, Sequelize);
db.Theatres = require("./theatre.details/theatres.js")(sequelize, Sequelize);
db.Movie = require("./movies/movies.js")(sequelize, Sequelize);
db.Review = require("./movies/reviews.js")(sequelize, Sequelize);
db.Location = require("./theatre.details/locations.js")(sequelize, Sequelize);
db.ShowTime = require("./theatre.details/showTime.js")(sequelize, Sequelize);
db.MovieShowDetails=require("./movies/movies.show.details.js")(sequelize, Sequelize)
//************* DB ASSOCIATION STARTS HERE ***************//

// Mapping

//user mapping

db.Users.belongsTo(db.Location, {
  as: "users",
  foreignKey: "locationId",
});
db.Location.hasMany(db.Users, {
  as: "location",
  foreignKey: "locationId",
});

// theatre mapping
db.Theatres.hasMany(db.Review, {
  as: "review",
  foreignKey: "reviewId",
});
db.Review.belongsTo(db.Theatres, {
  as: "theatre",
  foreignKey: "reviewId",
});

db.Theatres.hasMany(db.Location, {
  as: "location",
  foreignKey: "locationId",
});
db.Location.belongsTo(db.Theatres, {
  as: "theatres",
  foreignKey: "locationId",
});

db.Review.belongsTo(db.Movie, {
  as: "movies",
  foreignKey: "reviewId",
});
db.Movie.belongsTo(db.Review, {
  as: "review",
  foreignKey: "reviewId",
});

db.Movie.hasMany(db.MovieShowDetails, {
  as: "movieShowDetail",
  foreignKey: "movieId",
});
db.MovieShowDetails.belongsTo(db.Movie, {
  as: "movie",
  foreignKey: "movieId",
});

db.ShowTime.hasMany(db.MovieShowDetails, {
    as: "movieShowDetail",
    foreignKey: "showTimeId",
  });
  db.MovieShowDetails.belongsTo(db.ShowTime, {
    as: "showTime",
    foreignKey: "movieId",
  });
  
db.Theatres.hasMany(db.MovieShowDetails, {
    as: "movieShowDetail",
    foreignKey: "theatreId",
  });
  db.MovieShowDetails.belongsTo(db.Theatres, {
    as: "theatre",
    foreignKey: "theatreId",
  });


module.exports = db;
