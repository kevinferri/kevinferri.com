// routes/index.js
module.exports = function(app, passport) {

  // GET homepage
  app.get('/', function(req, res) {
    res.render('./statics/home.html', {
      title: 'Homepage'
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
    successRedirect : '/users/profile',
    failureRedirect : '/users/login',
    failureFlash : true 
  }));

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // GET signup form
  app.get('/users/signup', function(req, res) {
    res.render('/users/signup.html', { 
      title: 'Sign up',
      message: req.flash('signupMessage') 
    });
  });

  // POST signup form
  app.post('/users/signup', passport.authenticate('local-signup', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/signup',
    failureFlash : true,
  }));

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // GET profile page
  app.get('/users/profile', isLoggedIn, function(req, res) {
    res.render('/users/profile.html', {
      title: 'My profile',
      user : req.user // get the user out of session and pass to template
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
  if (req.isAuthenticated()) { // if user is authenticated in the session, carry on 
    return next();
  }
  res.redirect('/');
}