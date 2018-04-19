'use strict';

const httpGet = require('./get-json');

const baseUrl = 'http://localhost:3000/';
(async () => {
  const api = await httpGet(baseUrl);
  for (const resource of api.resources) {
    const data = await httpGet(baseUrl + resource);
    console.log(data);
  }
})();
