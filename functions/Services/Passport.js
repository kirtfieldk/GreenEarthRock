// WORKS
const passport = require("passport");
const GoogleStratagy = require("passport-google-oauth20").Strategy;
const keys = require("../Config/pro");
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStratagy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ userId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        userId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);
