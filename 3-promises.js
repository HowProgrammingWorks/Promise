const fs = require('fs');
const promisify = require('./promisify');

const readFile = promisify(fs.readFile);

readFile('file1.txt').then((data) => {
  console.log(data.toString());
  return readFile('file2.txt');
}).then((data) => {
  console.log(data.toString());
  return readFile('file3.txt');
}).then((data) => {
  console.log(data.toString());
});
