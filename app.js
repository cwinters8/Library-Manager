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
app.get('/books', (req, res, next) => {
  Book.findAll({order: [["title", "ASC"]]}).then(books => {
    res.render('index', {books});
  }).catch(err => {
    next(err);
  });
});

// new book
app.get('/books/new', (req, res) => {
  res.render('new-book');
});
// create the new book
app.post('/books/new', (req, res, next) => {
  Book.create(req.body).then(() => {
    res.redirect('/books');
  }).catch(err => {
    next(err);
  });
});

// route for each book
app.get('/books/:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    if (book) {
      res.render('update-book', {book});
    } else {
      next("Book does not exist");
    }
  }).catch(err => {
    next(err);
  });
});

// update a book
app.post('/books/:id', (req, res, next) => {
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
  }).catch(err => {
    next(err);
  });
});

// delete a book
app.post('/books/:id/delete', (req, res, next) => {
  Book.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect('/books');
  }).catch(err => {
    next(err);
  });
});

/******************
 * Error Handling *
 ******************/
// 404
app.use((req, res, next) => {
  res.render('page-not-found');
  res.status(404);
});

// caught errors
app.use((err, req, res, next) => {
  res.render('error');
  console.error(err);
});

// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));