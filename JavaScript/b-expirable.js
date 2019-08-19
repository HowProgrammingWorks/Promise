'use strict';

const PROMISE_TIMEOUT = 1000;

class Expirable extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      executor(val => {
        if (this.expired) {
          reject(new Error('Expired'));
          return;
        }
        clearTimeout(this.timer);
        resolve(val);
      }, reject);
    });
    this.expired = false;
    this.timer = setTimeout(() => {
      this.expired = true;
    }, PROMISE_TIMEOUT);
  }
}

// Usage

new Expirable(resolve => {
  setTimeout(resolve, 100);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error });
});

new Expirable(resolve => {
  setTimeout(resolve, 2000);
}).then(data => {
  console.dir({ data });
}).catch(error => {
  console.dir({ error });
});
