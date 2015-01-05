var Note = require('../models/Note.js');
var utils = require('utils');

module.exports = function(app) {

  // GET list of notebooks
  app.get('/notebooks', function(req, res) {
    Note.find(function(err, notes) {
      res.render('notebooks/index.html', {
        tite: 'Notebooks',
        jumbotron: 'Notebooks',
        notes: notes,
        count: notes.count
      });
    });
  });

  // GET list of notes in a notebook
  app.get('/notebooks/:slug', function(req, res) {
    Note.find({'notebook.slug': req.params.slug}, function(err, notes) {
      if (err) {
        throw err;
      }
      if (notes[0]) {
        var notebookTitle = notes[0].notebook.title;
        res.render('notebooks/show.html', {
          title: 'Notes in ' + notebookTitle,
          jumbotron: 'Notes in ' + notebookTitle,
          notes: notes,
          prettyDate: utils.prettyDate
        });
      } else {
        res.render('./statics/error.html', {
          title: 'Notebook not found',
          message: 'Notebook not found'
        });
      }
    });
  });

};