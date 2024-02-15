'use strict';

const fs = require('node:fs');

fs.promises.readFile('file1.txt', 'utf8')
  .then((data) => {
    console.dir({ file1: data });
  })
  .catch((reason) => {
    console.log('Cannot read file1.txt');
    console.log(reason);
  })
  .finally(() => {
    console.log('finally');
  });
