'use strict';

function printReceipt(inputs) {
  const cartItems = buildCartItems(inputs);
}

function buildCartItems(inputs) {
  let cartItems = [];
  const allItems = loadAllItems();

  inputs.forEach((input) => {
    let inputArray = input.split('-');
    let count;
    if(inputArray.length === 2){
      count = parseInt(inputArray[1]);
    } else {
      count = 1;
    }

    const item = allItems.find((item) => {
      return item.barcode === inputArray[0];
    });
    
    var cartItem = cartItems.find((cartItem) => {
      return inputArray[0] === cartItem.item.barcode;
    });

    if(cartItem) {
      cartItem.count += count;
    } else {
      cartItems.push({item: item , count: count});
    }
  });

  return cartItems;
}
