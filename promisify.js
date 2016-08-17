module.exports = function promisify(asyncFunction) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      asyncFunction.apply(undefined, args);
    });
  };
};
