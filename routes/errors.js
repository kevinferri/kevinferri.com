module.exports = function(app, passport) {

  app.get('/errors/not-logged-in', function(req, res) {
    res.render('/errors/not-logged-in.html', {
      title: 'Must Be Logged In',
    });
  });

  app.get('/errors/not-authorized', function(req, res) {
    res.render('/errors/not-authorized.html', {
      title: 'Not Authorized',
    });
  });

};