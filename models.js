'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date},
});

postSchema.virtual('nameString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();});


postSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.nameString,
    title: this.title,
    content: this.content,
    created: this.created
  };
};

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};
