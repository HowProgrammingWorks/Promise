'use strict';

const baseUrl = 'http://localhost:3000';

const promises = [
  fetch(baseUrl + '/person'),
  fetch(baseUrl + '/'),
  fetch(baseUrl + '/city'),
];

Promise.all(promises)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
