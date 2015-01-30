var Note = require('../models/Note.js');
var User = require('../models/User.js');
var utils = require('../modules/utils.js');
var permissions = require('../modules/permissions.js');

module.exports = function(app, passport) {

  // GET list of notes
  app.get('/', function(req, res) {
    Note.find(/*{ 'author.admin' : true }*/).sort({ createdAt: 'descending' }).exec(function(err, notes) {
      if (err) {
        throw err;
      }
      res.render('/notes/index.html', {
        title: 'Notes',
        jumbotron: 'Recent Thoughts',
        notes: notes,
        user: req.user,
        prettyDate: utils.prettyDate,
        getNotebookIcon: utils.getNotebookIcon
      });
    });
  }); 

  // GET new notes form
  app.get('/notes/new', permissions.isLoggedIn, function(req, res) {
    res.render('/notes/new.html', {
      title: 'Add A Note',
      jumbotron: 'Add A Note',
      user: req.user
    });
  });

  // GET individual note
  app.get('/notes/show/:slug', function(req, res) {
    var moreNotes;
    Note.find(/*{ 'author.admin': true }*/).where('slug').ne(req.params.slug).sort({ createdAt: 'descending' }).exec(function(err, notes) {
      if (err) {
        throw err;
      }
      moreNotes = notes;
      Note.findOne({'slug': req.params.slug}, function(err, note) {
        if (!note) {
          res.render('./statics/error.html', {
            title: 'Note not found',
            message: 'Note not found'
          });
        } else {
          res.render('notes/show.html', {
            title: note.title,
            jumbotron: note.title,
            note: note,
            moreNotes: moreNotes,
            prettyDate: utils.prettyDate,
            users: req.user,
            getNotebookIcon: utils.getNotebookIcon
          });
        }
      }); 
    });
  });

  // POST new note
  app.post('/notes/new', permissions.isLoggedIn, function(req, res) {
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
      } else {
        Note.find({ 'author._id': req.user._id }, function(err, notes) {
          if (err) {
            throw err;
          }
          res.render('/users/profile.html', {
            title: 'My Profile',
            jumbotron: 'My Profile',
            user: req.user,
            notes: notes,
            prettyDate: utils.prettyDate,
            successMessage: 'Your note has been added'
          });
        });
      }
    });
  });

  // DELETE individual note 
  app.get('/notes/delete/:slug', permissions.isLoggedIn, permissions.isOwner, function(req, res) {
    Note.findOneAndRemove({ 'slug': req.params.slug }, function(err, note) {
      if (err) {
        throw err;
      } else {
        Note.find({ 'author._id': req.user._id }, function(err, notes) {
          if (err) {
            throw err;
          }
          res.render('/users/profile.html', {
            title: 'My Profile',
            jumbotron: 'My Profile',
            user: req.user,
            notes: notes,
            prettyDate: utils.prettyDate,
            dangerMessage: 'Your note has been deleted'
          });
        });
      }
    })
  });

  // GET edit note form
  app.get('/notes/edit/:slug', permissions.isLoggedIn, permissions.isOwner, function(req, res) {
    Note.findOne({ 'slug': req.params.slug }, function(err, note) {
      if (err) {
        throw err;
      }
      res.render('/notes/edit.html', {
        title: 'Edit Note',
        jumbotron: 'Editing ' + note.title,
        note: note,
        slug: req.params.slug
      });
    });
  });

  // POST edit note form
  app.post('/notes/edit/:slug', permissions.isLoggedIn, permissions.isOwner, function(req, res) {
    Note.findOne({ 'slug': req.params.slug }, function(err, note) {
      if (err) {
        throw err;
      }
      note.title = req.body.title,
      note.notebook.title = req.body.notebook;
      note.notebook.slug = utils.toSlug(req.body.notebook);
      note.body = req.body.body;
      note.save();
      Note.find(/*{ 'author.admin' : true }*/).sort({ createdAt: 'descending' }).exec(function(err, notes) {
        res.render('/users/profile.html', {
          title: 'My Profile',
          jumbotron: 'My Profile',
          user: req.user,
          notes: notes,
          prettyDate: utils.prettyDate,
          successMessage: 'Your note has been updated'
        });
      });
    });
  });

};