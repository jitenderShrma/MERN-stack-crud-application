const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to server
require('./config/db');

// Init app
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client/build')));

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route file
const index = require('./routes/index');

// Use route file
app.use('/merchant', index);

// Production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen at ${port}`));