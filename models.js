'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a blog post
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: String, required: true},
  created: {type: String}
});

postSchema.virtual('nameString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();});


// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
postSchema.methods.serialize = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.nameString
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Post = mongoose.model('Post', postSchema);

module.exports = {Post};
