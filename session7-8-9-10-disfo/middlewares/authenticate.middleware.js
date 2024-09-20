const jwtStrategy = require("../config/passport");
const passport = require("passport");

passport.use(jwtStrategy);

module.exports = passport.authenticate("jwt", { session: false });