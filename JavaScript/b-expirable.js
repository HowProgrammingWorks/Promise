'use strict';

const PROMISE_TIMEOUT = 1000;

class Expirable {
  constructor(executor) {
    const promise = new Promise((resolve, reject) => {
      executor(val => {
        if (this.expired) return;
        clearTimeout(this.timer);
        resolve(val);
      }, err => {
        if (this.expired) return;
        clearTimeout(this.timer);
        reject(err);
      });
      this.timer = setTimeout(() => {
        this.expired = true;
        reject(new Error('Expired'));
      }, PROMISE_TIMEOUT);
    });
    this.promise = promise;
    this.expired = false;
    this.timer = null;
    return this.promise;
  }
}

// Usage

new Expirable(resolve => {
  setTimeout(() => {
    resolve('Resolved before timeout');
  }, 100);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error: error.message });
});

new Expirable((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Something went wrong'));
  }, 100);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error: error.message });
});

new Expirable(resolve => {
  setTimeout(() => {
    resolve('Never resolved before timeout');
  }, 2000);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error: error.message });
});

new Expirable((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Never rejected before timeout'));
  }, 2000);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error: error.message });
});
