const { resolve } = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8086;

app.use(helmet());
app.use(compression());

app.get('/debug', (req, res) => {
  res.status(200).send('hi developer');
})

app.get('/*', (req, res) => {
  res.status(200).send('hello express - ' + req.originalUrl);
})

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://localhost:${port}/`);
})
