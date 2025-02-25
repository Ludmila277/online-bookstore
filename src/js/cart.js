import { cartItems, updateCart, updateCartQuantity } from "./localStorage.js";

const updateButtonState = (btn, isInCart) => {
  btn.textContent = isInCart ? "In the cart" : "Buy now";
  btn.classList.toggle("added", isInCart);
};

let getcartItems = cartItems();
let cartCount = getcartItems.length;

updateCartQuantity(cartCount);

const countCartItems = (event) => {
  if (event.target.classList.contains("info_btn")) {
    const btn = event.target;
    const bookId = btn.dataset.bookId;
    const isActive = btn.classList.contains("added");

    if (!isActive) {
      getcartItems.push(bookId);
      cartCount++;
      cartCount = getcartItems.length;
    } else {
      const index = getcartItems.indexOf(bookId);
      if (index > -1) {
        getcartItems.splice(index, 1);
        cartCount--;
        cartCount = getcartItems.length;
      }
    }

    updateButtonState(btn, !isActive);
    updateCart(getcartItems);
    updateCartQuantity(cartCount);
  }
};

document.addEventListener("click", (event) => {
  countCartItems(event);
});
