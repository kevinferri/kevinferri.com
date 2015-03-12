var permissions = require('./modules/permissions.js');
var statics = require('./controllers/statics.js');
var users = require('./controllers/users.js');
var notes = require('./controllers/notes.js');
var notebooks = require('./controllers/notebooks.js');

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

  // Notes
  app.get('/', notes.getNotes);
  app.get('/notes/:slug', notes.getNote);
  app.get('/notes/new', permissions.isLoggedIn, permissions.isAdmin, notes.getNew);
  app.get('/notes/delete/:slug', permissions.isLoggedIn, permissions.isOwner, notes.getDelete);
  app.get('/notes/edit/:slug', permissions.isLoggedIn, permissions.isOwner, notes.getEdit);
  app.post('/notes/new', permissions.isLoggedIn, permissions.isAdmin, notes.postNew);
  app.post('/notes/edit/:slug', permissions.isLoggedIn, permissions.isOwner, notes.postEdit);

  // Notebooks
  app.get('/notebooks', notebooks.getNotebooks);
  app.get('/notebooks/:slug', notebooks.getNotebook)

}