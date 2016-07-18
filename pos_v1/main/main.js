'use strict';

function printReceipt(inputs) {
  const cartItems = buildCartItems(inputs);
}

function buildCartItems(inputs) {
  let cartItems = [];

  for(let input of inputs) {
    let splitedInput = input.split('-');
    let barcode = splitedInput[0];
    let count = parseFloat(splitedInput[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem) {
      cartItem.count += count;
    } else {
      let allItems = loadAllItems();
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}
