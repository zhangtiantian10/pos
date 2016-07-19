'use strict';

function buildCartItems(tags) {
  let cartItems = [];

  for(let tag of tags) {
    let splitedTag = tag.split('-');
    let barcode = splitedTag[0];
    let count = parseFloat(splitedTag[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count += count;
    } else {
      let allItems = loadAllItems();

      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}

function buildReceiptItems(cartItems) {
  let receiptItems = [];
  for(let cartItem of cartItems) {
    let promotions = loadPromotions();

    let promotion = promotions.find(promotion => promotion.type === 'BUY_TWO_GET_ONE_FREE');

    let subTotal, saveTotal;
    let price = cartItem.item.price;
    if(promotion) {
      subTotal = price * (cartItem.count - parseInt(cartItem.count / 3));
      saveTotal = price * parseInt(cartItem.count / 3);
    } else {
      subTotal = price * cartItem.count;
      saveTotal = 0;
    }

    receiptItems.push({cartItem: cartItem, subTotal: subTotal, savedTotal: saveTotal});
  }

  return receiptItems;
}
