'use strict';

const fs = require('fs');
const { promisify } = require('util');
const async = require('./async');

const readFile = promisify(fs.readFile);

const readTextFile = filename => readFile(filename, 'utf8')
  .then(buffer => buffer.toString());

async(function* () {
  console.log(yield readTextFile('file1.txt'));
  console.log(yield readTextFile('file2-!!!.txt'));
  console.log(yield readTextFile('file3.txt'));
}).catch(err => console.log(err));
