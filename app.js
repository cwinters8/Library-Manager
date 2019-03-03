const express = require('express');

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
  res.render('index');
});




// start the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));