'use strict';

const fs = require('node:fs');

fs.readFile('file1.txt', 'utf8', (err, data) => {
  if (err) console.error(err);
  else console.log({ data });
  fs.readFile('file2.txt', 'utf8', (err, data) => {
    if (err) console.error(err);
    else console.log({ data });
    fs.readFile('file3.txt', 'utf8', (err, data) => {
      if (err) console.error(err);
      else console.log({ data });
    });
  });
});
