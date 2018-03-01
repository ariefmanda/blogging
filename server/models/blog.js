const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: String,
    content : String,
    imgUrl : String,
    UserId: { type: Schema.Types.ObjectId, ref: 'user' },
    category : String
  },{
    timestamps: true
  });
var blog = mongoose.model('blog', blogSchema);
module.exports = blog;