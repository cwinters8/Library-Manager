const express = require('express');
const router = express.Router();
const Book = require('./models/book');

// create the app
const app = express();

/******************
 *** Middleware ***
 ******************/
// set view engine to pug
app.set('view engine', 'pug');

// static content
app.use('/static', express.static('public'));

/******************
 ***** Routes *****
 ******************/
// home route
app.get('/', (req, res) => {
  res.redirect('/books');
});

// books route
app.get('/books', (req, res) => {
  Book.findAll({order: [["title", "ASC"]]}).then(books => {
    res.render('index', {books});
  });
});

// route for each book
app.get('/:id', (req, res) => {
  Book.findByPk(req.params.id).then(book => {
    res.render('update-book', {book});
  });
});

// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));