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