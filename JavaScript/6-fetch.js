'use strict';

const http = require('node:http');

const fetch = (url) => new Promise((resolve, reject) => {
  http.get(url, (res) => {
    const code = res.statusCode;
    if (code !== 200) {
      return void reject(new Error(`HTTP status code ${code}`));
    }

    res.on('error', reject);

    const chunks = [];
    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const json = Buffer.concat(chunks).toString();
      try {
        const object = JSON.parse(json);
        return void resolve(object);
      } catch (error) {
        return void reject(error);
      }
    });
  });
});

module.exports = fetch;
