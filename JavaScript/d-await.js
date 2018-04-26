'use strict';

const httpGet = require('./get-json');

const baseUrl = 'http://localhost:3000/';

(async () => {
  try {
    const api = await httpGet(baseUrl);
  } catch (err) {
    console.log(err.code);
  }
  for (const resource of api.resources) {
    const data = await httpGet(baseUrl + resource);
    console.log(data);
  }
})();
