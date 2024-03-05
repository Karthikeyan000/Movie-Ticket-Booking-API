module.exports = (sequelize, Sequelize) => {
  const Theatres = sequelize.define("theatres", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    totalPersonRated: {
      type: Sequelize.INTEGER,
    },
    ratings: {
      type: Sequelize.FLOAT,
    },
    availableSeats: {
      type: Sequelize.INTEGER,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    // mapping fields(FK)
    reviewId: {
      type: Sequelize.UUID,
    },
    locationId: {
      type: Sequelize.UUID,
    },
  });

  return Theatres;
};
