const express = require('express');
const bodyParser = require('body-parser');

// book model
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

// body parsing
app.use(bodyParser.urlencoded({extended: false}));

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

// new book
app.get('/books/new', (req, res) => {
  res.render('new-book');
});
// create the new book
app.post('/books/new', (req, res) => {
  Book.create(req.body).then(() => {
    res.redirect('/books');
  });
});

// route for each book
app.get('/books/:id', (req, res) => {
  Book.findByPk(req.params.id).then(book => {
    res.render('update-book', {book});
  });
});
// update a book
app.post('/books/:id', (req, res) => {
  Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year
    },
    {where: {id: req.params.id}}
  ).then(() => {
    res.redirect('/books');
  })
});

// delete a book
app.post('/books/:id/delete', (req, res) => {
  Book.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect('/books');
  });
});

// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));