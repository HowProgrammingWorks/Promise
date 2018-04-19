'use strict';

const httpGet = require('./get-json');
const async = require('./async');

const baseUrl = 'http://localhost:3000/';
async(function* () {
  const api = yield httpGet(baseUrl);
  for (const resource of api.resources) {
    const data = yield httpGet(baseUrl + resource);
    console.log(data);
  }
});


