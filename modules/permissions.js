var Note = require('../models/Note.js');

// Make sure user is logged in
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('./statics/error.html', {
    title: 'Must Be Logged In',
    message: 'You must be logged in to view this page'
  });
}

// Make sure users can only edit and delete their own notes
exports.isOwner = function(req, res, next) {
  Note.findOne({ 'slug': req.params.slug }, function(err, note) {
    if (note.author._id == req.user._id) {
      next();
    } else {
      res.render('./statics/error.html', {
        title: 'Not Authorized',
        message: 'You are not authorized to do that'
      });
    }
  });
}
