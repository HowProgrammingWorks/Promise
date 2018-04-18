'use strict';

const fs = require('fs');
const promisify = require('./promisify');

const readFile = promisify(fs.readFile);

const readTextFile = filename => readFile(filename)
  .then(data => data.toString());

readTextFile('file1.txt')
  .then((data) => {
    console.log(data);
    return readTextFile('file2.txt');
  })
  .then((data) => {
    console.log(data);
    return readTextFile('file3.txt');
  })
  .then((data) => {
    console.log(data);
  });
