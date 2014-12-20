module.exports = function(app) {

  // GET homepage
  app.get('/', function(req, res) {
    res.render('/statics/home.html', {
      title: 'Kevin Ferri - Home',
      jumbotron: 'Hey, I&rsquo;m Kevin',
      user: req.user
    });
  });

}