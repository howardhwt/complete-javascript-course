"use strict";

const addTax = (rate) => (value) => value + value * rate;

const addVAT = addTax(0.23);

console.log(addVAT(100));
console.log(addVAT(23));
