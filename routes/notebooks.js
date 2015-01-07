var Note = require('../models/Note.js');
var utils = require('utils');

/**
 * @param {array} notes
 * @returns {object} table
 */
function countNotebooks(notes) {
  var table = Object.create(null);
  for (var i = 0; i < notes.length; i++) {
    if (typeof table[notes[i].notebook.slug] === 'undefined') {
      table[notes[i].notebook.slug] = 1;
    } else {
      table[notes[i].notebook.slug] += 1;
    }
  }
  return table;
}

module.exports = function(app) {

  // GET list of notebooks
  app.get('/notebooks', function(req, res) {
    Note.aggregate([
    // Group on the slug values and put other fields in an array
      { '$group': {
        '_id': '$notebook.slug',
        'count': { '$sum': 1 },
        'title': { '$first': '$notebook.title' }
      }},
    ],function(err, notebooks) {
      if (err) {
        throw err;
      }
      res.render('notebooks/index.html', {
        title: 'All Notebooks',
        jumbotron: 'Notebooks',
        notebooks: notebooks
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
          prettyDate: utils.prettyDate,
          count: notes.length
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