var LocalStrategy = require('passport-local').Strategy;
var User          = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      User.findOne({ 'local.username' :  username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();
            // set the user's local credentials
          newUser.local.email    = username;
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
};
