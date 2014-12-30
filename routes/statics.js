module.exports = function(app) {

  // GET homepage
  app.get('/about', function(req, res) {
    res.render('/statics/home.html', {
      title: 'Kevin Ferri | About',
      jumbotron: 'Hey, I&rsquo;m Kevin',
      user: req.user
    });
  });

}