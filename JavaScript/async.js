'use strict';

module.exports = (asyncFn) => {
  const generator = asyncFn();
  let result = generator.next();

  return new Promise((resolve, reject) => {
    step();

    function step() {
      const promise = Promise.resolve(result.value);

      if (result.done) {
        resolve(promise);
        return;
      }

      promise.then((data) => {
        result = generator.next(data);
        step();
      }).catch((err) => {
        try {
          result = generator.throw(err);
          step();
        } catch (error) {
          reject(error);
        }
      });
    }
  });
};
