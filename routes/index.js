var Note = require('../models/Note.js');
var utils = require('utils');

module.exports = function(app, passport) {

  // GET homepage
  app.get('/', function(req, res) {
    res.render('./statics/home.html', {
      title: 'Kevin Ferri - Home',
      jumbotron: 'Hey, I&rsquo;m Kevin',
      user: req.user
    });
  });


  // GET homepage
  app.get('/about', function(req, res) {
    res.render('./statics/about.html', {
      title: 'Kevin Ferri - About',
      jumbotron: 'About Me',
      user: req.user
    });
  });

  // GET login form
  app.get('/users/login', function(req, res) {
    res.render('/users/login.html', { 
      title: 'Login',
      message: req.flash('loginMessage') 
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
      message: req.flash('signupMessage') 
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
    res.render('/users/profile.html', {
      title: 'My Profile',
      jumbotron: 'My Profile',
      user: req.user
    });
  });

  // Logs you out, takes back to homepage
  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // GET list of notes
  app.get('/notes', function(req, res) {
    res.render('/notes/index.html', {
      title: 'Notes',
      jumbotron: 'Notes',
      user: req.user
    });
  });  

  // GET new notes form
  app.get('/notes/new', isLoggedIn, function(req, res) {
    res.render('/notes/new.html', {
      title: 'Add A Note',
      jumbotron: 'Add A Note',
      user: req.user
    });
  }); 

  // POST new note
  app.post('/notes/new', function(req, res) {
    var note = new Note({
      title: req.body.title,
      slug: utils.toSlug(req.body.title),
      notebook: req.body.notebook,
      body: req.body.body,
      author: {
        _id: req.user._id,
        username: req.user.local.username
      }
    });
    note.save(function(err) {
      if (err) {
        throw err;
      } 
      else {
        res.redirect('/notes');
      }
    });
  });

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