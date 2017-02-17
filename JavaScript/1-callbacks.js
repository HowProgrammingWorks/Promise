'use strict';

const fs = require('fs');

fs.readFile('file1.txt', (err, data) => {
  console.log(err || data.toString());
  fs.readFile('file2.txt', (err, data) => {
    console.log(err || data.toString());
    fs.readFile('file3.txt', (err, data) => {
      console.log(err || data.toString());
    });
  });
});
