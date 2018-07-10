'use strict';

const fs = require('fs');
const promisify = require('./promisify');

const readFile = promisify(fs.readFile);

readFile('file1.txt', 'utf8')
  .then(data => {
    console.log(data.toString());
    return readFile('file2.txt', 'utf8');
  })
  .then(data => {
    console.log(data.toString());
    return readFile('file3.txt', 'utf8');
  })
  .then(data => {
    console.log(data.toString());
  });
