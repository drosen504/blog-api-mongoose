'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create('My Life as a Snail', 'Life is hard as a snail. You gotta look out for salt...', 'by Dan R');
BlogPosts.create('Dress for Mediocrity', 'Heres what you do to dress for mediocrity...', 'by Leslie P');
BlogPosts.create('How to Win Go Fish', 'The biggest mistake people make when playing Go Fish is...', 'by Winnie J');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});



module.exports = router;