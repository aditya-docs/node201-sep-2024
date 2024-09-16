const bcrypt = require("bcrypt");
const User = require("../models/user.model");

class AuthService {
    signup = async (payload) => User.create({ 
        ...payload, 
        password: await this.generatePasswordHash(payload.password) 
    });
    generatePasswordHash = (plainTextPassword) => bcrypt.hash(plainTextPassword, 10);
}

module.exports = AuthService;