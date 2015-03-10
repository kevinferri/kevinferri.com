var Note        = require('../models/Note.js');
var User        = require('../models/User.js');
var utils       = require('../modules/utils.js');
var permissions = require('../modules/permissions.js');

// GET login
exports.getLogin = function(req, res) {
  res.render('/users/login.html', {
    title: 'Login',
    dangerMessage: req.flash('loginMessage')
  });
}

// GET signup
exports.getSignup = function(req, res) {
  res.render('/users/signup.html', {
    title: 'Sign up',
    dangerMessage: req.flash('signupMessage')
  });
}

// GET profile
exports.getProfile = function(req, res) {
  Note.find({'author._id': req.user._id}, function(err, notes) {
    if (err) {
      throw err;
    }
    res.render('/users/profile.html', {
      title: 'My Profile',
      jumbotron: 'My Profile',
      user: req.user,
      notes: notes,
      prettyDate: utils.prettyDate
    });
  });
}

// GET logout 
exports.getLogout = function(req, res) {
  req.logout();
  res.redirect('/');
}
