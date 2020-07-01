import passport from 'passport';
import * as PassportGoogleAuth20 from 'passport-google-oauth20';
import User from '../models/user';

const GoogleStrategy = PassportGoogleAuth20.Strategy;
const clientID = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const existingUser = await User.findById(id);
  done(null, existingUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(undefined, existingUser);
      } else {
        const { id, photos, displayName, emails } = profile;
        const email = emails && emails[0].value;
        const photo = photos && photos[0].value;
        console.log(photo);
        const newUser = await new User({
          googleId: profile.id,
          email,
          photo,
          name: displayName,
          isAdmin: false,
        }).save();
        done(undefined, newUser);
      }
    }
  )
);
