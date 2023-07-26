import { currentStartIndex } from "./google_book_api";

const sliderPageItemList = document.querySelectorAll(".slider-page-item");
const slider = document.querySelector(".slider");
const sliderImagePuthList = 
[
    "../src/image/slider/banner_1.jpg",
    "../src/image/slider/banner_2.jpg",
    "../src/image/slider/banner_3.jpg"
];

let currentIndex = 0;

for (let index = 0; index < sliderPageItemList.length; index++) {
    sliderPageItemList[index].addEventListener("click", (item) => {
        item.preventDefault();

        switchImage(index);
        swithPage(index);

        currentIndex = index;
    });
}

swithPageInterval();

function switchImage(index) {
    slider.innerHTML = `<img src="${sliderImagePuthList[index]}", alt="">`;
}

function swithPage(index) {
    sliderPageItemList.forEach(element => {
        element.classList.remove("dot-page-active");
        element.classList.add("dot-page-disable");
    });
    sliderPageItemList[index].classList.remove("dot-page-disable");
    sliderPageItemList[index].classList.add("dot-page-active");
}

function swithPageInterval() {
    setInterval(() => {
        if (currentIndex == 3) {
            currentIndex = 0;
        }
        switchImage(currentIndex);
        swithPage(currentIndex);

        currentIndex++;
    }, 5000);
}