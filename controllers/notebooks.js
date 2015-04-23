var Note  = require('../models/Note.js');
var utils = require('../helpers/utils.js');

exports.getNotebooks = function(req, res) {
  Note.aggregate([
    { 
      '$group': {
        '_id': '$notebook.slug',
        'count': { '$sum': 1 },
        'title': { '$first': '$notebook.title' }
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
      count: notebooks.count,
      getNotebookIcon: utils.getNotebookIcon
    });
  });
}

exports.getNotebook = function(req, res) {
  Note.find({ 'notebook.slug': req.params.slug }).sort({ createdAt: 'descending' }).exec(function(err, notes) {
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
}