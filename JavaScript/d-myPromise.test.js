'use strict';

const { test } = require('node:test');
const assert = require('node:assert');

// const MyPromise = Promise;
const MyPromise = require('./c-myPromise.js');

const DEFAULT_VALUE = 'default';

test('then', async (t) => {
  await t.test('with no chaining', async () => {
    // With `await` because we need to make sure `then` works
    const result = await new MyPromise((resolve) => resolve(DEFAULT_VALUE))
      .then((v) => v);
    assert.strictEqual(result, DEFAULT_VALUE);
  });

  await t.test('with chaining', () =>
    new MyPromise((resolve) => resolve(3))
      .then((v) => v * 4)
      .then((v) => v + 1)
      .then((v) => assert.strictEqual(v, 13))
  );

  await t.test('with timeout', () =>
    new MyPromise((resolve) => setTimeout(() => resolve(DEFAULT_VALUE), 10))
      .then((v) => assert(v, DEFAULT_VALUE))
  );

  await t.test('with multiple thens for same promise', () => {
    const myPromise = new MyPromise((resolve) => resolve(DEFAULT_VALUE));
    myPromise.then((v) => v + '1')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '1'));
    myPromise.then((v) => v + '2')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '2'));
  });
});

test('catch', async (t) => {
  await t.test('with no chaining', () =>
    new MyPromise((_, reject) => reject(DEFAULT_VALUE))
      .catch((v) => assert.strictEqual(v, DEFAULT_VALUE))
  );

  await t.test('with chaining', () =>
    new MyPromise((resolve) => resolve(3))
      .then((v) => { throw v * 4; })
      .then(() => 'Never')
      .catch((v) => v + 1)
      .then((v) => assert.strictEqual(v, 13))
  );

  await t.test('with timeout', () =>
    new MyPromise((_, reject) => setTimeout(() => reject(DEFAULT_VALUE), 10))
      .catch((v) => assert(v, DEFAULT_VALUE))
  );

  await t.test('with multiple catches for same promise', () => {
    const myPromise = new MyPromise((_, reject) => reject(DEFAULT_VALUE));
    myPromise.catch((v) => v + '1')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '1'));
    myPromise.catch((v) => v + '2')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '2'));
  });

  await t.test('with then and catch', () => {
    const assertFn = (v) => assert.strictEqual(v, DEFAULT_VALUE);
    const failFn = (v) => assert.strictEqual(v, 'Never');
    new MyPromise((resolve) => resolve(DEFAULT_VALUE))
      .then(assertFn, failFn);
    new MyPromise((_, reject) => reject(DEFAULT_VALUE))
      .then(failFn, assertFn);
  });
});

test('finally', async (t) => {
  await t.test('with no chaining', () => {
    new MyPromise((resolve) => resolve(DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined));
    new MyPromise((_, reject) => reject(DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined))
      .catch((v) => v);
  });

  await t.test('with chaining', () => {
    new MyPromise((resolve) => resolve(DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined))
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined));
    new MyPromise((_, reject) => reject(DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined))
      .catch((v) => assert.strictEqual(v, DEFAULT_VALUE))
      .finally((v) => assert.strictEqual(v, undefined));
  });

  await t.test('with multiple finallys for same promise', () => {
    const myPromise = new MyPromise((resolve) => resolve(DEFAULT_VALUE));
    myPromise.then((v) => v + '1')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '1'))
      .finally((v) => assert.strictEqual(v, undefined));
    myPromise.then((v) => v + '2')
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE + '2'))
      .finally((v) => assert.strictEqual(v, undefined));
  });
});

test('static methods', async (t) => {
  await t.test('resolve', () =>
    MyPromise.resolve(DEFAULT_VALUE)
      .then((v) => assert.strictEqual(v, DEFAULT_VALUE))
  );

  await t.test('reject', () =>
    MyPromise.reject(DEFAULT_VALUE)
      .catch((v) => assert.strictEqual(v, DEFAULT_VALUE))
  );

  await t.test('allSettled', () => {
    const promise1 = MyPromise.resolve(1);
    const promise2 = MyPromise.reject(2);
    return MyPromise.allSettled([promise1, promise2])
      .then((v) => assert.deepStrictEqual(v, [
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 2 },
      ]));
  });

  await t.test('all', async (t) => {
    await t.test('with success', () => {
      const promise1 = MyPromise.resolve(1);
      const promise2 = MyPromise.resolve(2);
      return MyPromise.all([promise1, promise2])
        .then((v) => assert.deepStrictEqual(v, [1, 2]));
    });

    await t.test('with fail', () => {
      const promise1 = MyPromise.resolve(1);
      const promise2 = MyPromise.reject(2);
      return MyPromise.all([promise1, promise2])
        .catch((v) => assert.strictEqual(v, 2));
    });
  });

  await t.test('any', async (t) => {
    await t.test('with success', () => {
      const promise1 = MyPromise.reject(1);
      const promise2 = MyPromise.resolve(2);
      return MyPromise.any([promise1, promise2])
        .then((v) => assert.strictEqual(v, 2));
    });

    await t.test('with fail', () => {
      const promise1 = MyPromise.reject(1);
      const promise2 = MyPromise.reject(2);
      return MyPromise.any([promise1, promise2])
        .catch((v) => assert.deepStrictEqual(v.errors, [1, 2]));
    });
  });

  await t.test('race', async (t) => {
    await t.test('with success', () => {
      const promise1 = MyPromise.resolve(1);
      const promise2 = MyPromise.reject(2);
      return MyPromise.race([promise1, promise2])
        .then((v) => assert.strictEqual(v, 1));
    });

    await t.test('with fail', () => {
      const promise1 = MyPromise.reject(1);
      const promise2 = MyPromise.reject(2);
      return MyPromise.race([promise1, promise2])
        .catch((v) => assert.strictEqual(v, 1));
    });
  });
});

// We can't use async/await here
// because `await` works like `then` and catches the error
test('UnhandledPromiseRejection', () => {
  process.on('unhandledRejection', (v) => assert.strictEqual(v, DEFAULT_VALUE));
  new MyPromise((_, reject) => reject(DEFAULT_VALUE));
});
