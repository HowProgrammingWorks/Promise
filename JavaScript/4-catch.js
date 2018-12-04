'use strict';

const fs = require('fs');

const readTextFile = filename => fs.promises.readFile(filename, 'utf8');

readTextFile('file1-.txt')
  .then(
    data => {
      console.dir({ file1: data });
      return readTextFile('file2.txt');
    },
    reason => {
      console.log('Cannot read file1.txt --- A');
      console.log(reason);
    }
  )
  .catch(
    reason => {
      console.log('Cannot read file1.txt --- B');
      console.log(reason);
    }
  )
  .then(data => {
    console.dir({ file2: data });
    return readTextFile('file3.txt');
  })
  .catch(reason => {
    console.log('Cannot read file2.txt');
    console.log(reason);
  })
  .then(data => {
    console.dir({ file3: data });
  })
  .catch(reason => {
    console.log('Cannot read file');
    console.log(reason);
  });
