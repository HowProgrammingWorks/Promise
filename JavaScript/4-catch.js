'use strict';

const { readFile } = require('node:fs/promises');

readFile('file1.txt', 'utf8')
  .then((data) => {
    console.dir({ file1: data });
    return readFile('file2.txt', 'utf8');
  }, (reason) => {
    console.log('1: Cannot read file1.txt');
    console.log(reason);
  })
  .catch((reason) => {
    console.log('2: Cannot read file1.txt');
    console.log(reason);
  })
  .then((data) => {
    console.dir({ file2: data });
    return readFile('file3.txt', 'utf8');
  })
  .catch((reason) => {
    console.log('Cannot read file2.txt');
    console.log(reason);
  })
  .then((data) => {
    console.dir({ file3: data });
  })
  .catch((reason) => {
    console.log('Cannot read file');
    console.log(reason);
  });
