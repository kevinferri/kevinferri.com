var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = ({
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
  },
  body: {
    type: String,
    required: true
  },
  notebook: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/*noteSchema.methods.generateSlug = function(title) {
  return title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}*/

module.exports = mongoose.model('Note', noteSchema);