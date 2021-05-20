const { ipcRenderer } = require("electron");

const addToCartBtn = document.getElementById("addToCartBtn");
const cart_food_info = document.getElementById("cart_food_info");
const add_on_table = document.getElementById("add_on_table");
const addOnTable = document.querySelector("#add_on_table");
const cartItems = document.querySelector(".cart_items");

//start of adding product to the cart
var itemsInCart = [];
addToCartBtn.addEventListener("click", addToCartClicked);

function addToCartClicked(e) {
  const item = cartItems.querySelector("#prduct_name").textContent;

  const qty = cartItems.querySelector(".cart-quantity-input").value;
  console.log("fQuantity", qty);

  const optionData = cartItems.querySelector("#mySelect");
  const varient = optionData.options[optionData.selectedIndex].text;

  const price = cartItems.querySelector("#product_price").textContent;

  const total = cartItems.querySelector("#total_price").textContent;
  itemsInCart.push(item, varient, price, qty, total);

  ipcRenderer.send("cartInItems", itemsInCart);
}
//end of adding product to the  cart

//Getting price changed based on quantity in addOn table
addOnTable.addEventListener("click", () => {
  const quantity = addOnTable.querySelector(".cart-quantity").value;
  const price = addOnTable.querySelector(".add_on_price").textContent;
  const totalPrice = price * quantity;
  const lastChild = document.querySelector(".total_price");
  lastChild.innerHTML = totalPrice;
});

//price quantity calculation
function calculatePriceQty() {
  const priceElement = document.querySelector("#cart_food_info #product_price");
  const quantityElement = document.querySelector(
    "#cart_food_info #quantity_input"
  );
  const total_price = document.querySelector("#cart_food_info #total_price");

  let price = parseInt(priceElement?.textContent);
  let quantity = parseInt(quantityElement?.value);
  let total = price * quantity;

  total_price.innerHTML = total;
}

//get total price of varient
function getTotalPrice() {
  let price = document.getElementById("addonPriceId").innerHTML;
  let quantity = document.getElementById("quantity").value;
  let totalPrice = document.querySelector("#addonTotalId");
  let total = price * quantity;
  totalPrice.innerHTML = total;
}

function getPriceByVarient() {
  var proportion = document.getElementById("mySelect").value;
  var price = document.getElementById("product_price");
  if (proportion == "1:1") {
    price.innerHTML = proportion;
  } else if (proportion == "1:3") {
    price.innerHTML = proportion;
  } else {
    price.innerHTML = proportion;
  }
}

ipcRenderer.on("foodVarientResultSent", (evt, results) => {
  console.log("foodVarientResultSent", results);
  var tr = "";
  tr = `

      <tr>
        <td id="prduct_name">${results[0].product_name}</td>
        <td><input id="quantity_input" class="cart-quantity-input" type="number" value="1" style="width: 5em" onchange=calculatePriceQty()></td>

        <td class="dropdown">
          <select class="form-select" id="mySelect" onchange=getPriceByVarient() aria-label="Default select example">
            
          ${results.map((food) => {
            return `<option value=${food.price}>${food.name}</option>`;
          })}
         
          </select>          
        </td>       
        <td id="product_price">${results[0].price}</td>
        <td id="total_price">${results[0].price}</td>  
      </tr>      
    `;

  cart_food_info.innerHTML = tr;
});

ipcRenderer.on("addOnResultSent", (evt, results) => {
  add_on_table.innerHTML = "";
  var tr = "";

  results.map((x) => {
    tr += `<tr>
          <td>${x.add_on_name}</td>
          <td><input id="quantity" class="cart-quantity" type="number" value="1" style="width: 5em"></td>
          <td class="add_on_price">${x.price}</td>
          <td class="total_price">${x.price}</td>

        </tr>`;
  });
  add_on_table.innerHTML += tr;
});
