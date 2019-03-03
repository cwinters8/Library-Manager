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
// home page
app.get('/', (req, res) => {
  Book.findAll({order: [["author", "ASC"], ["title", "ASC"]]}).then(books => {
    res.render('index', {books});
  })
});





// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));