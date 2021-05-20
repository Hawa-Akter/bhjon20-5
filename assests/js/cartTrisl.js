const { ipcRenderer } = require("electron");

const addToCartBtn = document.getElementById("addToCartBtn");
const cart_food_info = document.getElementById("cart_food_info");
const add_on_table = document.getElementById("add_on_table");
const addOnTable = document.querySelector("#add_on_table");
const cartItems = document.querySelector(".cart_items");

addToCartBtn.addEventListener("click", addToCartClicked);

function addToCartClicked(e) {
  const targetBtn = e.target;
  const item =
    targetBtn.parentElement.parentElement.firstElementChild.lastElementChild
      .firstElementChild.firstElementChild.textContent;

  const qty = cartItems.querySelector(".cart-quantity-input").value;

  const varient = cartItems.querySelector("#mySelect");
  const optionData = varient.options[varient.selectedIndex].text;

  const price =
    targetBtn.parentElement.parentElement.firstElementChild.lastElementChild
      .firstElementChild.firstElementChild.nextElementSibling.nextElementSibling
      .nextElementSibling.textContent;

  const total =
    targetBtn.parentElement.parentElement.firstElementChild.lastElementChild
      .firstElementChild.lastElementChild.textContent;

  addToCartItems(item, varient, price, total);
  //                     ipcRenderer.send("cartItems", addToCartItems(item, varient, price, total));
}

function addToCartItems(item, varient, price, total) {
  var cartTable = document.getElementById("cartItems");
  cartTable.innerHTML = "";

  var tableContents = `
  
   <table class="table" style="margin-top: 5rem;">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Varient</th>
                    <th>QTY</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody id="cart">
                <tr>
                  <th>${item}</th>
                  <td>${varient}</td>
                  <td>${price}</td>
                  <td>${total}</td>
                </tr>
            </tbody>
    </table>`;

  cartTable.innerHTML += tableContents;
}

//changing  price based on quantity on addOn table
addOnTable.addEventListener("click", (e) => {
  const targetEl = e.target;
  console.log(targetEl.parentElement);

  if (e.target.classList.contains("cart-quantity-input")) {
    const qty = targetEl.value;
    console.log("qty", qty);
    const price = targetEl.parentElement.nextElementSibling.textContent;
    const quantity = targetEl.value;

    totalPrice = price * quantity;

    let lastChild =
      (targetEl.parentElement.parentElement.lastElementChild.innerHTML =
        totalPrice);
  }
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
        <td >${results[0].product_name}</td>
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
          <td><input id="quantity" class="cart-quantity-input" type="number" value="1" style="width: 5em"></td>
          <td class="add_on_priceId">${x.price}</td>
          <td class="total_price">${x.price}</td>

        </tr>`;
  });
  add_on_table.innerHTML += tr;
});
