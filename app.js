const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/namesAPI');
const nameRouter = express.Router();
const port = process.env.PORT || 3000;
const Name = require('./models/nameModel');

// for debuging purpose
app.use(morgan('tiny'));

nameRouter.route('/names')
  .get((req, resp) => {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    Name.find(query, (err, name) => {
      if (err) {
        return resp.send(err);
      }
      return resp.json(name);
    });
    // { name: 'Abeni', gender: 'male', meaning: 'unknown' };
  });

app.use('/api', nameRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});
app.use('/components', express.static(path.join(__dirname, '/views/components')));
app.use('/extra', express.static(path.join(__dirname, '/views/')));
app.use('/database', express.static(path.join(__dirname, '/views/database')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  debug(`Listening at port ${chalk.green(port)}`);
});
