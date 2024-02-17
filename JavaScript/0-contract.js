'use strict';

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
    //reject(new Error('Custom error'));
  }, 0);
});

console.dir(promise); // Promise { <pending> }

promise.then((value) => {
  console.log({ value });
}, (error) => {
  console.error(error);
});
