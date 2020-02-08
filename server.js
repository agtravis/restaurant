'use strict';

//dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// const writeFile = fs.writeFile;
// const readFile = fs.readFile;

// const writeFileAsync = util.promisify(writeFile);
// const readFileAsync = util.promisify(readFile);

//setup
const app = express();
const PORT = 3000;

//setup express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
  const absolutePath = path.join(__dirname, 'index.html');
  res.sendFile(absolutePath);
});

app.get('/tables', (req, res) => {
  const absolutePath = path.join(__dirname, 'tables.html');
  res.sendFile(absolutePath);
});

app.get('/reserve', (req, res) => {
  const absolutePath = path.join(__dirname, 'reserve.html');
  res.sendFile(absolutePath);
});

app.get('/api/tables', (req, res) => {
  let tables;
  fs.readFile('table.json', 'utf8', (err, data) => {
    if (err) throw err;
    tables = data;
    res.json(JSON.parse(tables));
  });
});

app.get('/api/waitlist', (req, res) => {
  let waitlist;
  fs.readFile('waitlist.json', 'utf8', (err, data) => {
    if (err) throw err;
    waitlist = data;
    res.json(JSON.parse(waitlist));
  });
});

app.post('/api/tables', (req, res) => {
  const newReservation = req.body;
  let tables;
  fs.readFile('table.json', 'utf8', (err, data) => {
    if (err) throw err;
    tables = JSON.parse(data);
    if (tables.length < 5) {
      tables.push(newReservation);
      if (tables.length > 1) {
        for (let i = 0; i < tables.length; ++i) {
          if (tables[i] === tables[i + 1]) {
            tables.splice(tables.indexOf(i), 1);
          }
        }
      }
      fs.writeFile('table.json', JSON.stringify(tables), 'utf8', err => {
        if (err) throw 'jsfgsdkf';
      });
      res.json(true);
    } else {
      let waiting;
      fs.readFile('waitlist.json', 'utf8', (err, data) => {
        if (err) throw err;
        waiting = JSON.parse(data);
        waiting.push(newReservation);
        if (waiting.length > 1) {
          for (let i = 0; i < waiting.length; ++i) {
            if (waiting[i] === waiting[i + 1]) {
              waiting.splice(waiting.indexOf(i), 1);
            }
          }
        }
        fs.writeFile('waitlist.json', JSON.stringify(waiting), 'utf8', err => {
          if (err) throw 'error';
        });
      });
      res.json(false);
    }
  });
});

//listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
