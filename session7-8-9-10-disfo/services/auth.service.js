const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

class AuthService {
    signup = async (payload) => User.create({ 
        ...payload, 
        password: await this.generatePasswordHash(payload.password) 
    });

    generatePasswordHash = (plainTextPassword) => bcrypt.hash(plainTextPassword, 10);

    login = async ({ username, password }) => {
        const reqUser = await User.findOne({ username });
        if(!reqUser)
            throw new Error("UserNotFound");

        const isLoggedIn = await this.verifyPassword(password, reqUser.password);
        
        if(isLoggedIn)
            return {
                isLoggedIn, token: this.generateJwt({ userId: reqUser._id })
            }
        return { isLoggedIn }
    }

    verifyPassword = (plainTextPassword, hashedPassword) => bcrypt.compare(plainTextPassword, hashedPassword)
    
    // { maxAge: "1h" } // 1 hour
    // { maxAge: "30m" } // 30 minutes
    // { maxAge: 120 } // 120 seconds
    // { maxAge: "120" } // 120 milliseconds
    generateJwt = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 30 })
}

module.exports = AuthService;