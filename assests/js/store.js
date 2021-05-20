const { ipcMain } = require("electron");

//remove cart item
var removeItemFromCart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeItemFromCart.length; i++) {
  var removeBtn = removeItemFromCart[i];
  removeBtn.addEventListener("click", removeCartItem);
}

// quantity value change
var quantityInput = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInput.length; i++) {
  var quantity = quantityInput[i];
  quantity.addEventListener("change", quantityChanged);
}

// add to cart
var cartItems = document.getElementsByClassName("shop-item-button");
for (var i = 0; i < cartItems.length; i++) {
  var cartItemButton = cartItems[i];
  cartItemButton.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerHTML;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerHTML;
  var imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

  //add row to the cart
  addToCartItem(title, price, imgSrc);
}

// function addToCartItem(title, price, imgSrc) {
//   var cartItemContents = "";
//   var cartItems = document.getElementById("cart_items");
//   cartItemContents = `
//   <div class="cart-row">
//     <div class="cart-item cart-column">
//         <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
//         <span class="cart-item-title">${title}</span>
//     </div>
//     <span class="cart-price cart-column">${price}</span>
//     <div class="cart-quantity cart-column">
//         <input class="cart-quantity-input" type="number" value="1">
//         <button class="btn btn-danger" type="button">REMOVE</button>

//     </div>
//   </div>`;
//   cartItems.innerHTML += cartItemContents;
//   updateCartTotal();

// }

function addToCartItem(title, price, imgSrc) {
  var cart_row = document.createElement("div");
  cart_row.classList.add("cart-row");

  var cart_items = document.getElementsByClassName("cart-items")[0];
  var cart_item_names = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cart_item_names.length; i++) {
    //const name = cart_  item_names[i].innerText;
    if (cart_item_names[i].innerText == title) {
      return;
    }
  }
  var cart_contents = `
      <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>

      </div>`;

  cart_row.innerHTML = cart_contents;
  //append method inserts a set of DOMString objects after the last child
  cart_items.append(cart_row);
  updateCartTotal();
  cart_row
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cart_row
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    var price = parseFloat(priceElement.innerHTML.replace("$", ""));

    var quantity = quantityElement.value;

    var subTotalPrice = price * quantity;
    total = total + subTotalPrice;
  }
  //rounding the total into 2 Decimal place
  total = Math.round((total + Number.EPSILON) * 100) / 100;

  var totalPrice = document.getElementsByClassName("cart-total-price")[0];
  totalPrice.innerHTML = "$" + total;
}
