const Users = require("../models/user.model");

class UserService {
  register = async (user) => {
    try {
      const { fullName, email, username } = user;
      const newUser = new Users({ email, username, fullName });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
    const userResult = await Users.find({});
    return userResult;
  };

  findByUsername = async (username) => {
    try {
      const userResult = await Users.findOne({ username });
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
