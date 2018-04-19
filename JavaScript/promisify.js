'use strict';

module.exports = fn => (...args) => (
  new Promise((resolve, reject) => {
    args.push((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    fn(...args);
  })
);
