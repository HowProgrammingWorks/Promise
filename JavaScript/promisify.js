'use strict';

module.exports = asyncFunction => (...args) => (
  new Promise((resolve, reject) => {
    args.push((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    asyncFunction(...args);
  })
);
