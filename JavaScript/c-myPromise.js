'use strict';

// You can test this Promise in other files.
// Just add at the beginning;
//
// const Promise = require('./c-myPromise.js');

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class UnhandledPromiseRejection extends Error {
  constructor(value) {
    const error = `\n${value}`;
    super(error);
  }
}

class MyPromise {
  constructor(executor) {
    this._status = STATUS.PENDING;
    this._value = undefined;
    this._subs = [];
    this._isRunsCallbacks = false;

    this._resolve = (value) => this._done(value, STATUS.FULFILLED);
    this._reject = (reason) => this._done(reason, STATUS.REJECTED);

    try {
      executor(this._resolve, this._reject);
    } catch (error) {
      this._reject(error);
    }
    return this;
  }

  _done(value, status) {
    if (this._status !== STATUS.PENDING) return;
    if (value instanceof MyPromise) {
      value.then(this._resolve, this._reject);
      return;
    }
    this._value = value;
    this._status = status;
    this._runCallbacks();
  }

  _runCallbacks() {
    if (this._status === STATUS.PENDING || this._isRunsCallbacks) return;
    this._isRunsCallbacks = true;

    // setTimeout is only needed to catch unhandledRejection
    // Promise can work without it
    setTimeout(() => {
      const isUnhandledPromiseRejection =
        this._status === STATUS.REJECTED && !this._subs.length;

      if (isUnhandledPromiseRejection) {
        const process = require('node:process');
        if (process.listenerCount('unhandledRejection')) {
          process.emit('unhandledRejection', this._value, this);
        } else {
          throw new UnhandledPromiseRejection(this._value);
        }
      }

      while (this._subs.length) {
        const sub = this._subs.shift();
        const callback = sub[this._status];
        callback(this._value);
      }

      this._isRunsCallbacks = false;
    }, 0);
  }

  _subscribe(onFulfilledCallback, onRejectedCallback) {
    const sub = {
      [STATUS.FULFILLED]: onFulfilledCallback,
      [STATUS.REJECTED]: onRejectedCallback,
    };
    this._subs.push(sub);
  }

  then(onFulfilled = null, onRejected = null) {
    return new MyPromise((resolve, reject) => {
      const onFulfilledCallback = (value) => {
        if (!onFulfilled) {
          resolve(value);
          return;
        }
        try {
          resolve(onFulfilled(value));
        } catch (error) {
          reject(error);
        }
      };

      const onRejectedCallback = (reason) => {
        if (!onRejected) {
          reject(reason);
          return;
        }
        try {
          resolve(onRejected(reason));
        } catch (error) {
          reject(error);
        }
      };

      this._subscribe(onFulfilledCallback, onRejectedCallback);
      this._runCallbacks();
    });
  }

  catch(onRejected = null) {
    return this.then(null, onRejected);
  }

  finally(onFinally = null) {
    return new MyPromise((resolve, reject) => {
      const onFinallyCallback = () => {
        if (!onFinally) return;
        try {
          onFinally();
        } catch (error) {
          console.error(error);
        }
      };

      const onFulfilledCallback = (value) => {
        onFinallyCallback();
        resolve(value);
      };

      const onRejectedCallback = (reason) => {
        onFinallyCallback();
        reject(reason);
      };

      this._subscribe(onFulfilledCallback, onRejectedCallback);
      this._runCallbacks();
    });
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static allSettled(promises) {
    const length = promises.length;
    const result = new Array(length).fill(null);
    let completedPromises = 0;

    return new MyPromise((resolve) => {
      for (let i = 0; i < length; i++) {
        promises[i]
          .then(
            (value) => {
              result[i] = { status: STATUS.FULFILLED, value };
            },
            (reason) => {
              result[i] = { status: STATUS.REJECTED, reason };
            }
          )
          .finally(() => {
            completedPromises++;
            if (completedPromises === length) resolve(result);
          });
      }
    });
  }

  static all(promises) {
    const length = promises.length;
    const result = new Array(length).fill(null);
    let completedPromises = 0;

    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        promises[i]
          .then((value) => {
            result[i] = value;
            completedPromises++;
            if (completedPromises === length) resolve(result);
          })
          .catch(reject);
      }
    });
  }

  static any(promises) {
    const length = promises.length;
    const errors = new Array(length).fill(null);
    let errorsPromises = 0;

    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        promises[i]
          .catch((reason) => {
            errors[i] = reason;
            errorsPromises++;
            if (errorsPromises === length) reject(errors);
          })
          .then(resolve);
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }
}

module.exports = MyPromise;
