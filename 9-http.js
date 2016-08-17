const httpGet = require('./get-json');
const async = require('./async');

const baseUrl = 'http://localhost:3000/';
async(function* () {
  let api = yield httpGet(baseUrl);
  for (let resource of api.resources) {
    let data = yield httpGet(baseUrl + resource);
    console.log(data);
  }
});
