module.exports = (sequelize, Sequelize) => {
  const Movies = sequelize.define("movies", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.DATE,
    },
    lastShowDate: {
      type: Sequelize.DATE,
    },
    totalPersonRated: {
      type: Sequelize.INTEGER,
    },
    ratings: {
      type: Sequelize.FLOAT,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    // mapping fields(FK)
    reviewId: {
      type: Sequelize.UUID,
    },
  });

  return Movies;
};
