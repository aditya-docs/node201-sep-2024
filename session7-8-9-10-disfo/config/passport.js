const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
    try {
        const user = await UserServiceInstance.findByUserId(payload.userId);
        return done(null, user);
      } catch (error) {
        return done(error, false);
    }
})

module.exports = strategy;