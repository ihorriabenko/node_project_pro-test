const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, BASE_URL } =
  process.env;
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const callbackURL = `${BASE_URL}${GOOGLE_CALLBACK_URL}`;
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { given_name, email, verified, provider } = profile;

    const user = await User.findOne({ email });

    if (user) {
      // req.user = user === return done(null, user) \\
      return done(null, user);
    }

    const password = uuidv4();
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username: given_name,
      email,
      password: hashPassword,
      verify: verified,
      verificationToken: provider,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

module.exports = googleStrategy;
