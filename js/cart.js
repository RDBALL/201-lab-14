/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
let table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  let cartItems = JSON.parse(localStorage.getItem('cartKey')) || [];
  cart = new Cart(cartItems);
  // cart = cartItems;
  // console.log(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// complete: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbodyElem = document.querySelector('tbody');
  while(tbodyElem.firstChild) {
    tbodyElem.removeChild(tbodyElem.firstChild);
  }
}

// complete: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // complete: Find the table body
  let tbodyElem = document.querySelector('tbody');



  // complete: Iterate over the items in the cart
  for (let i = 0; i < cart.items.length; i += 1){
    // complete: Create a TR
    let trElem = document.createElement('tr');
    tbodyElem.appendChild(trElem);
    // complete: Create a TD for the delete link, quantity,  and the item

    let tdELem0 = document.createElement('td');
    trElem.appendChild(tdELem0);
    tdELem0.setAttribute('id', `x-button${i}`);
    tdELem0.setAttribute('class', 'xbtn');
    tdELem0.textContent = 'X';

    let tdELem1 = document.createElement('td');
    trElem.appendChild(tdELem1);
    tdELem1.textContent = cart.items[i].quantity;

    let tdELem2 = document.createElement('td');
    trElem.appendChild(tdELem2);
    tdELem2.textContent = cart.items[i].product;
  }

  // complete: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  let id = event.target.id;
  let xbtn = id.slice(0, 8);
  let index = id.slice(-1);

  // complete: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (xbtn === 'x-button') {
    cart.removeItem(index);
    // complete: Save the cart back to local storage
    cart.saveToLocalStorage();
    // complete: Re-draw the cart table
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
