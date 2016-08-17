import fs from 'fs';
import promisify from '../promisify';

const readFile = promisify(fs.readFile);

async function readTextFile(filename) {
  let data = await readFile(filename);
  return data.toString();
}

(async () => {
  console.log(await readTextFile('../file1.txt'));
  console.log(await readTextFile('../file2.txt'));
  console.log(await readTextFile('../file3.txt'));
})();
