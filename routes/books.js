const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// GET all books
router.get('/', (req, res, next) => {
  Book.findAll({order: [["author", "ASC"], ["title", "ASC"]]}).then(books => {
    res.render('index', {books});
  })
})