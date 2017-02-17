'use strict';

import httpGet from '../get-json';

const baseUrl = 'http://localhost:3000/';

(async () => {
  let api = await httpGet(baseUrl);
  for (let resource of api.resources) {
    let data = await httpGet(baseUrl + resource);
    console.log(data);
  }
})();
