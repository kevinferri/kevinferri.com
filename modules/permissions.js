var User = require('../models/User.js');
var Note = require('../models/Note.js');

/**
 * Middleware to make sure a user is logged in
 * @param {{}} req
 * @param {{}} res
 * @param {function} next
 * @returns {function}
 */
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('./users/login.html', {
    title: 'Login',
    dangerMessage: 'You must be logged in to view this page.'
  });
}

/**
 * Middleware to make sure user is creator of a note
 * @param {{}} req
 * @param {{}} res
 * @param {function} next
 * @returns {function}
*/
exports.isOwner = function(req, res, next) {
  Note.findOne({ 'slug': req.params.slug }, function(err, note) {
    if (note) {
      if (note.author._id == req.user._id) {
        return next();
      } else {
        res.render('./statics/errors.html', {
          title: 'Not Authorized',
          message: 'You are not authorized to do that.'
        });
      }
    } else {
      res.render('./statics/error.html', {
        title: 'Error',
        message: 'Note not found'
      });
    }
  });
}

/**
 * Middleware to make sure user is admin
 * @param {{}} req
 * @param {{}} res
 * @param {function} next
 * @returns {function}
 */
exports.isAdmin = function(req, res, next) {
  User.findOne({ '_id': req.user._id }, function(err, user) {
    if (user.admin) {
      return next();
    } else {
      res.render('./statics/errors.html', {
        title: 'error',
        message: 'You are not authorized to do that.'
      });
    }
  });
}
