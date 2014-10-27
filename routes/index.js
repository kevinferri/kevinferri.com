module.exports = function(app, passport) {

  // GET homepage
  app.get('/', function(req, res) {
    res.render('./statics/home.html', {
      title: 'Kevin Ferri - Home',
      jumbotron: 'Hey, I&rsquo;m Kevin',
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
      user: req.user
    });
  });

  // Logs you out, takes back to homepage
  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/notes', function(req, res) {
    res.render('/notes/index.html', {
      title: 'Notes',
      jumbotron: 'Notes'
    });
  });  
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}