'use strict';

function printReceipt(tags) {
  const cartItems = buildCartItems(tags);
}

function buildCartItems(tags) {
  let cartItems = [];

  for(let tag of tags) {
    let splitedTag = tag.split('-');
    let barcode = splitedTag[0];
    let count = parseFloat(splitedTag[1] || 1);

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
