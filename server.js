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
// app.get('/', (req, res) => {
//   const absolutePath = path.join(__dirname, 'index.html');
//   res.sendFile(absolutePath);
// });

// app.get('/tables', (req, res) => {
//   const absolutePath = path.join(__dirname, 'tables.html');
//   res.sendFile(absolutePath);
// });

app.get('/reserve', (req, res) => {
  const absolutePath = path.join(__dirname, 'reserve.html');
  res.sendFile(absolutePath);
});

// app.get('/api/tables', (req, res) => {
//   let tables;
//   fs.readFile('table.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     tables = data;
//     res.json(JSON.parse(tables));
//   });
// });

// app.get('/api/waitlist', (req, res) => {
//   let waitlist;
//   fs.readFile('waitlist.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     waitlist = data;
//     res.json(JSON.parse(waitlist));
//   });
// });

app.post('/api/tables', (req, res) => {
  fs.readFile('reservations.json', 'utf8', (err, data) => {
    console.log(data);
    let json = JSON.parse('[' + data + ']');
    json.push(req.body);
    fs.writeFile('reservations.json', 'JSON.stringify(json)', err => {
      console.log(err);
    });
  });
});

// app.post('/api/tables', (req, res) => {
//   console.log('posted');
//   const newReservation = req.body;
//   let tables;
//   fs.readFile('reservations.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     tables = JSON.parse(data);
//     console.log('--------old table------------');
//     console.log(data);
//     tables.push(newReservation);

//     console.log(newReservation);
//     console.log('----------new table---------------------');
//     console.log(tables);
//     fs.writeFile('reservations.json', JSON.stringify(tables), 'utf8', err => {
//       if (err) throw 'jsfgsdkf';
//       console.log('-------write------------------------');
//     });
//   });
// });

//listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
