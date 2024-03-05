module.exports = (sequelize, Sequelize) => {
  const Locations = sequelize.define("locations", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    // mapping fields(FK)

    // theatreId: {
    //   type: Sequelize.UUID,
    // },
    // userId: {
    //   type: Sequelize.UUID,
    // },
  });

  return Locations;
};
