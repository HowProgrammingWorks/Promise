'use strict';

const fs = require('fs');

const readFile = (filename) => new Promise((resolve, reject) => {
  fs.readFile(filename, (err, data) => {
    if (err) reject(err);
    else resolve(data.toString());
  });
});

readFile('file1.txt')
  .then(data => {
    console.log(data);
    return readFile('file2.txt');
  })
  .then(data => {
    console.log(data);
    return readFile('file3.txt');
  })
  .then(data => {
    console.log(data);
  });
