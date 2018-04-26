'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const readTextFile = async (filename) => {
  let data = await readFile(filename);
  return data.toString();
};

(async () => {
  console.log(await readTextFile('../file1.txt'));
  console.log(await readTextFile('../file2.txt'));
  console.log(await readTextFile('../file3.txt'));
})();
