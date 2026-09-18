const db = require("../models/index");
const Users = db.Users;

module.exports = {
  userFindById: async (userData) => {
    // Find singleUser using id
    const singleUser = await Users.findById(userData);

    return singleUser;
  },
  userUpdate: async (updateData, whereClause) => {
    // update one user based on condition in whereClause
    const userUpdateCall = await Users.update(updateData, {
      where: whereClause,
    });

    return userUpdateCall;
  },
  userFindOne: async (email) => {
    
    // find singleUser using email
    const singleUser = await Users.findOne({
      where: { email },
    });

    return singleUser;
  },
  userFindOneByMobile: async (mobile) => {
    
    // find singleUser using email
    const singleUser = await Users.findOne({
      where: { mobile },
    });

    return singleUser;
  },
};
