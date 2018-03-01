const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    image_url : String,
  },{
    timestamps: true
  });
var user = mongoose.model('user', userSchema);
module.exports = user;