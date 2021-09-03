const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('../utils/config');

//init db connection
require('../database/models');

const app = express();

app.use(bodyParser.json());
app.use(express.static(config.clientSideAppPath));
app.use('/', routes);

module.exports = app;
