var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/User.js');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Sign up strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true // pass back the entire request to the callback
  },
  function(req, username, password, done) {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      User.findOne({ 'local.username':  username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();
          newUser.admin = false;
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });    
    });
  }));

  // Login Strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    User.findOne({ 'local.username':  username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
      }
      return done(null, user);
    });
  }));

};
