const httpGet = require('./get-json');

const baseUrl = 'http://localhost:3000/';
httpGet(baseUrl).then((api) => {
  let promises = [];
  for (let resource of api.resources) {
    promises.push(httpGet(baseUrl + resource));
  }
  Promise.all(promises).then((values) => {
    console.log(values);
  });
});
