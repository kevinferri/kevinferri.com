var Note = require('../models/Note.js');
var User = require('../models/User.js');
var utils = require('utils');

module.exports = function(app, passport) {

  app.get('/errors/not-logged-in', function(req, res) {
    res.render('/errors/not-logged-in.html', {
      title: 'Must Be Logged In',
    });
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/errors/not-logged-in');
}
