const fs = require('fs');
const async = require('./async');
const promisify = require('./promisify');

const readFile = promisify(fs.readFile);

function readTextFile(filename) {
  return readFile(filename)
    .then(buffer => buffer.toString());
}

async(function* () {
  console.log(yield readTextFile('file1.txt'));
  console.log(yield readTextFile('file2-!!!.txt'));
  console.log(yield readTextFile('file3.txt'));
}).catch(err => console.log(err));
