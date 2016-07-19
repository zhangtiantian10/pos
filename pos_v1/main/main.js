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
  let promotions = loadPromotions();

  return cartItems.map((cartItem) => {
    let promotion = promotions.find(promotion => promotion.barcodes.includes(cartItem.item.barcode));

    let promotionType = promotion ? promotion.type : '';

    let {subTotal, savedTotal} = discount(cartItem, promotionType);

    return {cartItem, subTotal, savedTotal};
  });
}

function discount(cartItem, promotionTYpe) {
  let subTotal = cartItem.item.price * cartItem.count;
  let savedTotal = 0;
  if(promotionTYpe === 'BUY_TWO_GET_ONE_FREE') {
    savedTotal = cartItem.item.price * parseInt(cartItem.count / 3);
    subTotal -= savedTotal;
  }

  return {savedTotal, subTotal};
}
