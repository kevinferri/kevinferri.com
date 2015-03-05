module.exports = function(app) {

  // GET homepage
  app.get('/about', function(req, res) {
    res.render('/statics/about.html', {
      title: 'About',
      jumbotron: 'Hey, I&rsquo;m Kevin',
      user: req.user
    });
  });

  // get resume
  app.get('/resume', function (req, res) {
    res.render('/statics/resume.html', {
      title: 'Resume'
    });
  });

}
