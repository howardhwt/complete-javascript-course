//Import module
// import { addToCart, totalPrice as Price, tq } from "./shoppingCart.js";

// addToCart("bread", 5);

// console.log(Price, tq);
console.log("Importing module");

// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// console.log(price);

import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 3);
add("apple", 5);
console.log(cart);

// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  //   console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
lastPost.then((last) => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 2);
ShoppingCart2.addToCart("pizza", 4);
console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); //undefined because didn't return this in IIFE object

import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 },
  ],
  user: { loggedIn: true },
};
const stateDeepClone = cloneDeep(state);
const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateDeepClone);
console.log(stateClone);
