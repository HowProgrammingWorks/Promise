'use strict';

const fs = require('fs');

const readTextFile = filename => fs.promises.readFile(filename, 'utf8');

readTextFile('file1-.txt')
  .then(data => {
    console.dir({ file1: data });
  })
  .catch(reason => {
    console.log('Cannot read file1.txt');
    console.log(reason);
  })
  .finally(() => {
    console.log('finally');
  });
