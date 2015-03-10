var permissions = require('./modules/permissions.js');
var statics = require('./controllers/statics.js');
var users = require('./controllers/users.js');
/*var notes = require('./controllers/notes.js');
var notebooks = require('./controllers/notebooks.js');*/

module.exports = function(app, passport) {

  // Statics 
  app.get('/about', statics.about);
  app.get('/resume', statics.resume);

  // Users
  app.get('/users/login', users.getLogin);
  app.get('/users/signup', users.getSignup);
  app.get('/users/profile', permissions.isLoggedIn, users.getProfile);
  app.get('/users/logout', users.getLogout);
  app.post('/users/login', passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  }));
  app.post('/users/signup', passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true,
  }));
}