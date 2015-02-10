var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    _id: String,
    username: String,
    admin: Boolean
  },
  body: {
    type: String,
    required: true
  },
  notebook: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  secret: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);

