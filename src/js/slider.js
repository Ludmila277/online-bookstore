const images = [
  {
    url: "./src/img/banner.png",
  },
  {
    url: "./src/img/banner2.png",
  },
  {
    url: "./src/img/banner3.png",
  },
];
let CurNumber = 0;
const autoplayInterval = 5000;
const sliderWrapper = document.querySelector(".slider");
const sliderImages = sliderWrapper.querySelector(".slider-images");
const parentDots = sliderWrapper.querySelector(".slider-dots");

function InitImages() {
  images.forEach((image, index) => {
    let imageElement = document.createElement("div");
    imageElement.classList = `image n${index} ${index ? "" : "active"}`;
    imageElement.dataset.index = index;
    imageElement.style.backgroundImage = `url('${image.url}')`;
    sliderImages.appendChild(imageElement);
  });
}
function initSlider(images) {
  if (!images || !images.length) return;
  InitImages();
}

initSlider(images);

function moveSlider() {
  sliderImages.querySelector(".active").classList.remove("active");
  sliderImages.querySelector(`.n${CurNumber}`).classList.add("active");

  let dotsWrapper = document.querySelector(".slider-dots");
  dotsWrapper.querySelector(".active").classList.remove("active");
  dotsWrapper.querySelector(`.n${CurNumber}`).classList.add("active");
}

function initDots() {
  images.forEach((image, index) => {
    let dot = document.createElement("div");
    dot.className = `slider-dots__item n${index} ${index ? "" : "active"}`;
    dot.dataset.index = index;
    dot.addEventListener("click", function () {
      CurNumber = +this.dataset.index;
      moveSlider();
      parentDots.querySelector(".active").classList.remove(".active");
      this.classList.add(".active");
    });
    parentDots.appendChild(dot);
  });
}
initDots();

function initAutoplay() {
  setInterval(() => {
    CurNumber = CurNumber === images.length - 1 ? 0 : CurNumber + 1;
    moveSlider();
  }, autoplayInterval);
}

initAutoplay();
export {
  initSlider,
  moveSlider,
  InitImages,
  initDots,
  images,
  autoplayInterval,
  initAutoplay,
};
