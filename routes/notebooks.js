var Note = require('../models/Note.js');
var utils = require('utils');

module.exports = function(app) {

  // GET list of notebooks
  app.get('/notebooks', function(req, res) {
    Note.aggregate([
      { 
        '$group': {
          '_id': '$notebook.slug',
          'count': { 
            '$sum': 1 
          },
          'title': { 
            '$first': '$notebook.title'
          }
        }
      },
    ], function(err, notebooks) {
      if (err) {
        throw err;
      }
      res.render('notebooks/index.html', {
        title: 'All Notebooks',
        jumbotron: 'Notebooks',
        notebooks: notebooks,
        getNotebookIcon: utils.getNotebookIcon
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
          notebookTitle: notebookTitle,
          notes: notes,
          prettyDate: utils.prettyDate,
          count: notes.length,
          getNotebookIcon: utils.getNotebookIcon
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
