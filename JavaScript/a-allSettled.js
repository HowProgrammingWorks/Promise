"use strict";

const fetch = require("./6-fetch.js");

const baseUrl = "http://localhost:3000";

const promises = [
  fetch(baseUrl + "/person"),
  fetch(baseUrl + "/"),
  fetch(baseUrl + "/fail"),
  fetch(baseUrl + "/city"),
];

Promise.allSettled(promises)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
