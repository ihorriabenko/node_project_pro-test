const passport = require("passport");
const googleStrategy = require("./strategies/google-strategy");
const facebookStrategy = require("./strategies/facebook-strategy");

passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);

module.exports = passport;
