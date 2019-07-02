'use strict';

// Pending

const promise1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('value1');
  }, 0);
});
console.dir({ promise1 }); // Promise { <pending> }
promise1.then(console.log); // 'value1' (delayed)

// Immediate resolve

const promise2 = new Promise(resolve => resolve('value2'));
console.dir({ promise2 }); // Promise { 'value2' }
promise2.then(console.log); // 'value2'

// Immediate reject

const promise3 = new Promise((resolve, reject) => {
  reject(new Error('I have no value for you'));
});
console.dir({ promise3 }); // Promise { <rejected> Error... }
promise3.then(console.log).catch(console.log); // Error...

// Promise.resolve

const promise4 = Promise.resolve('value4');
console.log({ promise4 }); // Promise { 'value4' }
promise4.then(console.log); // 'value4'

// Promise.reject

const promise5 = Promise.reject(new Error('I have no value for you'));
console.dir({ promise5 }); // Promise { <rejected> Error... }
promise5.then(console.log).catch(console.log); // Error...

// Example with I/O

const fs = require('fs');

const readFile = (filename, encoding) =>
  new Promise((resolve, reject) =>
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    }));

readFile('file1.txt', 'utf8')
  .then(data => {
    console.log(data);
    return readFile('file2.txt', 'utf8');
  })
  .then(data => {
    console.log(data);
    return readFile('file3.txt', 'utf8');
  })
  .then(data => {
    console.log(data);
  });
