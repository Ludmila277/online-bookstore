const cartItems = () => {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch (error) {
    console.error("Ошибка парсинга cartItems:", error);
    return [];
  }
};

const updateCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const updateCartQuantity = (count) => {
  const cartCounter = document.querySelector(".cart-counter");
  cartCounter.textContent = count;
  cartCounter.style.display = count > 0 ? "block" : "none";
};

export { cartItems, updateCart, updateCartQuantity };
