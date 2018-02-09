'use strict';

const fs = require('fs');
const promisify = require('./promisify');

const readFile = promisify(fs.readFile);

function readTextFile(filename) {
  const promise = readFile(filename).then(data => data.toString());
  return promise;
}

readTextFile('file1.txt').then((data) => {
  console.log(data);
  return readTextFile('file2.txt');
}).then((data) => {
  console.log(data);
  return readTextFile('file3-!!!.txt');
}).then((data) => {
  console.log(data);
}).catch((reason) => {
  console.log('Cannot read file');
  console.log(reason);
});
