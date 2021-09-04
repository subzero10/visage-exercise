const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('../utils/config');
const history = require('connect-history-api-fallback');

//init db connection
require('../database/models');

const app = express();

app.use(history());
app.use(bodyParser.json());
app.use(express.static(config.clientSideAppPath));
app.use('/', routes);

module.exports = app;
