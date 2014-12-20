var Note = require('../models/Note.js');
var User = require('../models/User.js');
var utils = require('utils');

module.exports = function(app, passport) {

  // GET login form
  app.get('/users/login', function(req, res) {
    res.render('/users/login.html', {
      title: 'Login',
      dangerMessage: req.flash('loginMessage')
    });
  });

  // POST login form
  app.post('/users/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

  // GET signup form
  app.get('/users/signup', function(req, res) {
    res.render('/users/signup.html', {
      title: 'Sign up',
      dangerMessage: req.flash('signupMessage')
    });
  });

  // POST signup form
  app.post('/users/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true,
  }));

  // GET profile page
  app.get('/users/profile', isLoggedIn, function(req, res) {
    Note.find({'author._id': req.user._id}, function(err, notes) {
      if (err) {
        throw err;
      }
      res.render('/users/profile.html', {
        title: 'My Profile',
        jumbotron: 'My Profile',
        user: req.user,
        notes: notes
      });
    });
  });

  // Logs you out, takes back to homepage
  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/errors/not-logged-in');
}