const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(__dirname + '/dist'));

app.get('/logos', (req, res) => {
  return res.json(require('./static/logos.json'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
