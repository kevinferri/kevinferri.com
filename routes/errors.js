module.exports = function(app, passport) {

  app.get('/error', function(req, res) {
    res.render('/statics/error.html', {
      title: 'Error',
      message: 'Error'
    });
  });

};