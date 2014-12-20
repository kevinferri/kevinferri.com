var Note = require('../models/Note.js');
var User = require('../models/User.js');
var utils = require('utils');

module.exports = function(app) {

  // GET list of notebooks
  app.get('/notebooks', function(req, res) {
    Note.find(function(err, notes) {
      res.render('notebooks/index.html', {
        jumbotron: 'Notebooks',
        notes: notes
      });
    });
  });

  // GET list of notes in a notebook
  app.get('/notebooks/:slug', function(req, res) {
    Note.find({'notebook.slug': req.params.slug}, function(err, notes) {
      res.render('notebooks/show.html', {
        jumbotron: 'Notes in ' + req.params.slug,
        notes: notes
      });
    });
  });

};