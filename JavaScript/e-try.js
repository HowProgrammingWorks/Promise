'use strict';

// Need node.js 23

const sumSync = (a, b) => {
  if (typeof a !== 'number') throw Error('Expected a: number');
  if (typeof b !== 'number') throw Error('Expected b: number');
  return a + b;
};

const sumAsync = async (a, b) => {
  if (typeof a !== 'number') throw Error('Expected a: number');
  if (typeof b !== 'number') throw Error('Expected b: number');
  return a + b;
};

// Call sync, expected 5

Promise.try(sumSync, 2, 3)
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.error({ error: error.message });
  })
  .finally(() => {
    console.log({ finally: '2+3=5' });
  });

// Call sync, expected error

Promise.try(sumSync, '4', 5)
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.error({ error: error.message });
  })
  .finally(() => {
    console.log({ finally: 'Wrong type: a' });
  });

// Call async, expected 13

Promise.try(sumAsync, 6, 7)
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.error({ error: error.message });
  })
  .finally(() => {
    console.log({ finally: '6+7=13' });
  });

// Call async, expected error

Promise.try(sumAsync, 8, '9')
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.error({ error: error.message });
  })
  .finally(() => {
    console.log({ finally: 'Wrong type: b' });
  });
