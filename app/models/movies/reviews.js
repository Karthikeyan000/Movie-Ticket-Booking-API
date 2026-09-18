module.exports = (sequelize, Sequelize) => {
  const Reviews = sequelize.define("reviews", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    comments: {
      type: Sequelize.TEXT,
    },
    ratings: {
      type: Sequelize.FLOAT,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    //mapping fields
    userId: {
      type: Sequelize.UUID,
    },
    movieId: {
      type: Sequelize.UUID,
    },
    theatreId: {
      type: Sequelize.UUID,
    },
  });

  return Reviews;
};
