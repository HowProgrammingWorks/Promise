'use strict';

const fetch = require('./6-fetch.js');

fetch('http://localhost:3000/person')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
