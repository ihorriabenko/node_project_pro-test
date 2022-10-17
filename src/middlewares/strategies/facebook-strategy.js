const { Strategy } = require("passport-google-oauth2");

const { User } = require("../../models/user");

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK_URL, APP_URL } =
  process.env;

const callbackURL = `${APP_URL}${FACEBOOK_CALLBACK_URL}`;
const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL,
  passReqToCallback: true,
};

const facebookCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile);
    const { email } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const newUser = await User.create({ email });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);

module.exports = facebookStrategy;
