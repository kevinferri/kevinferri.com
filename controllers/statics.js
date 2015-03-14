// GET about page
exports.about = function(req, res) {

  res.render('/statics/about.html', {
    title: 'About',
    jumbotron: 'Hey, I&rsquo;m Kevin',
    user: req.user
  });
}

// GET resume page
exports.resume = function(req, res) {
  app.get('/resume', function (req, res) {
    res.render('/statics/resume.html', {
      title: 'Resume'
    });
  });
}