const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(serveStatic(`${__dirname}/dist`));

app.get('/logos', (req, res) => res.json(require('../static/logos.json')));

module.exports = app;
module.exports.handler = serverless(app);
