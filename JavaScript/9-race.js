'use strict';

const fetch = require('./6-fetch.js');

const baseUrl = 'http://localhost:3000/';

const promises = [
  fetch(baseUrl + '/person'),
  fetch(baseUrl + '/'),
  fetch(baseUrl + '/city')
];

Promise.race(promises)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
