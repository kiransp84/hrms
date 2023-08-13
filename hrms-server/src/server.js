require('./environment')();

///////////
const express = require('express');
const app = express();
////////////

///
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
////

// moving to a router 
const approuter = require('./routes'); 
approuter(app);

app.listen( process.env.PORT , () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});