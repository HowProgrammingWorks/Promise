const httpGet = require('./get-json');

const baseUrl = 'http://localhost:3000/';
httpGet(baseUrl + 'person').then((data) => {
  console.log(data);
  return httpGet(baseUrl + 'city');
}).then(console.log);
