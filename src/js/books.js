const key = "AIzaSyD4Bq-elrnfD4ATiRxzxTOudiUj7lQQM5I";
const loadBtn = document.querySelector(".button-container__load");
const cardsBlock = document.querySelector(".cards-block");
const categoriesLinks = document.querySelectorAll(".main-list__item");

const params = new URLSearchParams();

let startIndex = 0;
const cartList = JSON.parse(localStorage.getItem("cartItems")) ?? [];

const getActiveCategory = () => {
  const activeElement = document.querySelector(".main-list__item_active");
  return activeElement ? activeElement.dataset.category : null;
};

const initBooks = async () => {
  const category = getActiveCategory();
  if (!category) return;

  params.set("q", `subject:${category}`);
  params.append("key", `${key}`);
  params.append("printType", `books`);
  params.append("startIndex", startIndex);
  params.append("maxResults", `6`);
  params.append("langRestrict", `en`);

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayBooks(data.items);
  } catch (error) {
    console.error("Ошибка загрузки книг:", error);
  }
};

const handleCategoryClick = (event) => {
  const target = event.target.closest(".main-list__item");
  if (!target) return;

  categoriesLinks.forEach((link) =>
    link.classList.remove("main-list__item_active")
  );
  target.classList.add("main-list__item_active");
  cardsBlock.innerHTML = "";
  startIndex = 0;
  initBooks();
};

categoriesLinks.forEach((link) => {
  link.addEventListener("click", handleCategoryClick);
});

const displayBooks = (books) => {
  let title = " ";
  let authors = "";
  let thumbnail = "";
  let price = "";
  let averageRating = "";
  let ratingsCount = "";
  let description = "";

  books.forEach((book) => {
    authors = book.volumeInfo?.authors?.join(", ") || "Unknown";
    thumbnail = book.volumeInfo.imageLinks.thumbnail || "";
    title = book.volumeInfo.title || "Unknown";
    description = book.volumeInfo.description || "No description";
    price = book.saleInfo.retailPrice
      ? book.saleInfo.retailPrice.amount +
        " " +
        book.saleInfo.retailPrice.currencyCode
      : "Unavailable";
    ratingsCount = book.volumeInfo.ratingsCount || 0;
    averageRating = Math.round(book.volumeInfo.averageRating || 0);

    let percent = (averageRating / 5) * 100;

    const check = cartList.includes(book.id);

    let ratingStars = `<svg width="160" height="32" viewBox="0 0 160 32">
      <defs>
        <mask id="perc">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect x="${percent}%"  y="0" width="100%" height="100%" fill="grey" />
        </mask>

        <symbol viewBox="0 0 32 32" id="star">
          <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
        </symbol>
        <symbol viewBox="0 0 160 32" id="stars">
          <use xlink:href="#star" x="-64" y="0"></use>
          <use xlink:href="#star" x="-32" y="0"></use>
          <use xlink:href="#star" x="0" y="0"></use>
          <use xlink:href="#star" x="32" y="0"></use>
          <use xlink:href="#star" x="64" y="0"></use>
        </symbol>
      </defs>
      <use
        xlink:href="#stars"
        fill="yellow"
        stroke="black"
        mask="url(#perc)"
      ></use>
    </svg>`;

    cardsBlock.innerHTML += `
                <div class="cards_item">
                   <img src = ${thumbnail} alt="book cover" class="card_img">

                  <div class="card_info">
                    <div class="info_author">${authors}</div>
                    <div class="info_title">${title}</div>
                    <div class="info_raiting">
                        <div>${ratingStars}</div>
                        ${ratingsCount} review</div>
                    <p class="info_text">${description}</p>
                    <div class="info_cost">${price}</div>
                   <button class="info_btn ${
                     check ? "added" : ""
                   }" data-book-id="${book.id}">${
      check ? "In the cart" : "buy now"
    }</button>
                  </div>
                  </div>
                </div>`;
  });
};

loadBtn.addEventListener("click", () => {
  startIndex += 6;
  initBooks();
});

document.addEventListener("DOMContentLoaded", () => {
  const firstCategory = categoriesLinks[0];
  if (firstCategory) {
    firstCategory.classList.add("main-list__item_active");
  }

  if (!document.querySelector(".main-list__item_active")) {
    categoriesLinks[0].classList.add("main-list__item_active");
  }
  initBooks();
});

export {
  initBooks,
  displayBooks,
  getActiveCategory,
  handleCategoryClick,
  loadBtn,
};
