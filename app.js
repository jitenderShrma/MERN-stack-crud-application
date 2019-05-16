const express = require('express');
const bodyParser = require('body-parser');

// Connect to server
require('./config/db');

// Init app
const app = express();

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route file
const index = require('./routes/index');

// Use route file
app.use('/merchant', index);

// Listen server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen at ${port}`));