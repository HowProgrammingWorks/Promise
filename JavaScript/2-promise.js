'use strict';

const fs = require('fs');

const readFile = (filename, encoding) =>
  new Promise((resolve, reject) =>
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    }));

readFile('file1.txt', 'utf8')
  .then(data => {
    console.log(data);
    return readFile('file2.txt', 'utf8');
  })
  .then(data => {
    console.log(data);
    return readFile('file3.txt', 'utf8');
  })
  .then(data => {
    console.log(data);
  });
