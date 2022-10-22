const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  APP_URL,
} = process.env;
const { Strategy } = require("passport-facebook");
const { User } = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const callbackURL = `${APP_URL}${FACEBOOK_CALLBACK_URL}`;
const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL,
  passReqToCallback: true,
  profileFields: ['displayName', 'email']
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
    const { displayName, verified, provider } = profile;
    const [value] = profile.emails;
    const {value: email} = value;

    const user = await User.findOne({ email });

    if (user) {
      // req.user = user === return done(null, user) \\
      return done(null, user);
    }

    const password = uuidv4();
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username: "asd",
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

const facebookStrategy = new Strategy(facebookParams, facebookCallback);

module.exports = facebookStrategy;
