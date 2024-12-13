const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

require('./config/mongoose');
require('./config/databse');

const app = express();

app.use(bodyParser.json());
app.use('/api', orderRoutes);

module.exports = app;