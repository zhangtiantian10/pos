'use strict';

function printReceipt(inputs) {
  const cartItems = buildCartItems(inputs);
}

function buildCartItems(inputs) {
  let cartItems = [];

  inputs.forEach((input) => {
    let inputArray = input.split('-');
    if(inputArray.length != 1){
      cartItems = searchSameBarcode(cartItems, inputArray[0], parseInt(inputArray[1]));
    } else {
      cartItems = searchSameBarcode(cartItems, inputArray[0], 1);
    }
  });

  return cartItems;
}

function searchSameBarcode(cartItems, barcode, count) {
  let item = searchBarcodeInAllItems(barcode);

  let findBarcode = cartItems.find((cartItem) => {
    return barcode === cartItem.item.barcode;
  });

  if(findBarcode) {
    cartItems[cartItems.indexOf(findBarcode)].count += count;
  } else {
    cartItems.push({item: item , count: count});
  }

  return cartItems;
}


function searchBarcodeInAllItems(barcode) {
  const allItems = loadAllItems();

  return allItems.find((item) => {
    return item.barcode === barcode;
  });

}
