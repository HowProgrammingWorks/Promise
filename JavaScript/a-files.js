'use strict';

const fs = require('fs');
const async = require('./async');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const readTextFile = filename => readFile(filename)
  .then(buffer => buffer.toString());

async(function* () {
  console.log(yield readTextFile('file1.txt'));
  console.log(yield readTextFile('file2.txt'));
  console.log(yield readTextFile('file3.txt'));
});
