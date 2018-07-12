const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const admin = require('../models/adminmod');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  // Local Strategy
  passport.use(new LocalStrategy(function (username, password, done) {
    // Match Username
    let query = {
      username: username
    };
    admin.findOne(query, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false);
      }

      // Match Password
      bcrypt.compare(password, user.pass, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    admin.findById(id, function (err, user) {
      done(err, user);
    });
  });
}