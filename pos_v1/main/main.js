'use strict';

function printReceipt(inputs) {
  const cartItems = buildCartItems(inputs);
}

function buildCartItems(inputs) {
  let cartItems = [];
  const allItems = loadAllItems();

  for (input of inputs) {
    const inputArray = input.split('-');
    const barcode = inputArray[0];
    const count = inputArray.length === 2 ? parseInt(inputArray[1]) : 1;

    const item = allItems.find((item) => {
      return item.barcode === barcode;
    });

    const cartItem = cartItems.find((cartItem) => {
      return cartItem.item.barcode === barcode;
    });

    if(cartItem) {
      cartItem.count += count;
    } else {
      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}
