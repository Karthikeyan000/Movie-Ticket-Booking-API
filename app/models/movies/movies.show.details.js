module.exports = (sequelize, Sequelize) => {
  const MovieShowDetails = sequelize.define("movie_show_details", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    theatreId: {
      type: Sequelize.UUID,
      references: {
        model: sequelize.Theatres,
        key: "id",
      },
    },
    movieId: {
      type: Sequelize.UUID,
      references: {
        model: sequelize.Movie,
        key: "id",
      },
    },
    occupiedSeats:{
        type: Sequelize.INTEGER,
    },
    availableSeats:{
        type: Sequelize.INTEGER,
    },
    ticketDate: {
      type: Sequelize.DATE,
    },
    orderNo: {
      type: Sequelize.INTEGER,
    },
    isDelete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.UUID,
    },
    updatedBy: {
      type: Sequelize.UUID,
    },
  });

  return MovieShowDetails;
};
