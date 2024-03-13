'use strict';

// Task: change `iterate` contract from chainable callbacks
// to Promise (chainable or you can call it with await syntax)

const iterate = (items) => {
  let index = 0;
  const chain = {
    next: (callback) => {
      if (index < items.length) {
        callback(items[index++]);
      }
      return chain;
    }
  };
  return chain;
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

// Use await syntax to get items
iterate(electronics).next((item) => {
  console.log(item);
}).next((item) => {
  console.log(item);
}).next((item) => {
  console.log(item);
});
