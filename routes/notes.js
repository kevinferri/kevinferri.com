var Note = require('../models/Note.js');
var User = require('../models/User.js');
var utils = require('utils');

module.exports = function(app, passport) {

// GET list of notes
  app.get('/', function(req, res) {
    Note.find(function(err, notes) {
      if (err) {
        throw err;
      }
      res.render('/notes/index.html', {
        title: 'Notes',
        jumbotron: 'Things I Need To Write Down',
        notes: notes,
        user: req.user,
        prettyDate: utils.prettyDate
      });
    });
  }); 

  // GET new notes form
  app.get('/notes/new', isLoggedIn, function(req, res) {
    res.render('/notes/new.html', {
      title: 'Add A Note',
      jumbotron: 'Add A Note',
      user: req.user
    });
  });

  // GET individual note
  app.get('/notes/:slug', function(req, res) {
    Note.findOne({'slug': req.params.slug}, function(err, note) {
      if (!note) {
        res.render('./errors/note-not-found.html', {
          slug: req.params.slug
        });
      } else {
      res.render('notes/show.html', {
        title: note.title,
        jumbotron: note.title,
        note: note,
        prettyDate: utils.prettyDate,
        users: req.user
      });
    }
    }); 
  });

  // POST new note
  app.post('/notes/new', function(req, res) {
    var note = new Note({
      title: req.body.title,
      slug: utils.toSlug(req.body.title),
      notebook: {
        title: req.body.notebook,
        slug: utils.toSlug(req.body.notebook)
      },
      body: req.body.body,
      author: {
        _id: req.user._id,
        username: req.user.local.username,
      }
    });
    note.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          res.render('/notes/new.html', {
            title: 'Add A Note',
            jumbotron: 'Add A Note',
            user: req.user,
            prevTitle: req.body.title,
            notebook: req.body.notebook,
            body: req.body.body,
            dangerMessage: 'There is already a note with that title.'
          });
        } else {
          console.log(err);
          throw err;
        }
      }
      else {
        Note.find(function(err, notes) {
          if (err) {
            throw err;
          }
          res.render('/notes/index.html', {
            title: 'Notes',
            jumbotron: 'Notes',
            notes: notes,
            user: req.user,
            prettyDate: utils.prettyDate,
            successMessage: 'Your note has beeen added.'
          });
        });
      }
    });
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/errors/not-logged-in');
}