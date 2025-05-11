'use strict';

// Need node.js 22

const sumAsync = (a, b, callback) => {
  if (typeof a !== 'number') return;
  if (typeof b !== 'number') return;
  setImmediate(() => {
    callback(a + b);
  });
};

// Old approach

const old = async () => {
  let resolve, reject;
  const promise = new Promise((resolved, rejected) => {
    resolve = resolved;
    reject = rejected;
  });
  setTimeout(reject, 1000, new Error('Timed out'));
  sumAsync(2, 3, resolve);
  const result = await promise;
  console.log({ result });
};

old();

// Alternative approach

const alternative = async () => {
  const promise = new Promise((resolve, reject) => {
    sumAsync(4, 5, resolve);
    setTimeout(reject, 1000, new Error('Timed out'));
  });
  const result = await promise;
  console.log({ result });
};

alternative();

// New approach

const modern = async () => {
  const { promise, resolve, reject } = Promise.withResolvers();
  setTimeout(reject, 1000, new Error('Timed out'));
  sumAsync(6, 7, resolve);
  const result = await promise;
  console.log({ result });
};

modern();
