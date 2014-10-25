var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// Generates a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checks if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Creates the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);