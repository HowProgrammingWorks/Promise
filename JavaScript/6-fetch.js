'use strict';

const http = require('node:http');

const fetch = (url) =>
  new Promise((resolve, reject) => {
    http.get(url, async (res) => {
      const code = res.statusCode;
      if (code !== 200) {
        const err = new Error(`HTTP status code ${code}`);
        return void reject(err);
      }
      const chunks = [];
      for await (const chunk of res) chunks.push(chunk);
      const data = Buffer.concat(chunks).toString();
      resolve(JSON.parse(data));
    });
  });

module.exports = fetch;
