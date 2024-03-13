'use strict';

// Task: here is given code you can't touch but you need to
// write solution below to sum given prices (wrapped in promises).
// Use Promise.all to resolve promises.
// Use functions: `formatMoney` and `sum` as utilities.
// Additional task: add .catch and .finally blocks in chain

// Do not touch following code

const CURRENCY_RATE = 1.09;

const convert = ({ price }) => Promise.resolve(price * CURRENCY_RATE);

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const prices = electronics.map(convert);

const formatMoney = (x) => parseFloat(x.toFixed(2));

const sum = (a, b) => a + b;

// Write solution below
