import * as googleApiClient from "./google_book_api.js";
import {setEventListenerForBtnItemToCart} from "./card_handler.js";

const bookCardWrapper = document.querySelector(".card-wrapper");
const cartItemCount = document.querySelector(".bag-count");

const bookList = await googleApiClient.getBookList(null, 0);
addBooksInView(bookList);


function fillAndGetBookCardItem(book) {
    let cardItemHtml = 
    `
        <div class="card-wrapper__item"> 
            <img class="card-wrapper__item-img" src=${book.img}>
            <div class="card-wrapper__item-description-wrapper"> 
                <span class="autor">${book.autorList}</span>
                <span class="name">${book.title}</span>
                <div class="rating-wrapper">
                ${getHtmlRating(book.averageRating)}
                    <span class="rating-text">${book.ratingsCount ? book.ratingsCount + "review" : ``}</span>
                </div>
                <span class="desctioption">${book.description ? book.description : ""}</span>
                <span class="price">${book.price}</span>
                <button class="btn item-to-cart-btn">buy now</button>
            </div>
        </div>
    `;
    return cardItemHtml;
}

export function addBooksInView(bookList) {
    let carditemListHtml = "";
    bookList.forEach(book => {
        carditemListHtml += fillAndGetBookCardItem(book);
    });
    bookCardWrapper.innerHTML = carditemListHtml;
    console.log("listener");
    setEventListenerForBtnItemToCart();
}

export function setCountItemToIconCart(count) {
    debugger;
    
    cartItemCount.innerHTML = count === 0 ? "" : count;
}

function getHtmlRating(rating) {
    let result = ``;

    if (!rating) {
        return `<span class="rating-star-wrapper"> 
                    ${result}
                </span>`;;
    }
    let star = `<img src="../src/image/rating/star.svg">`;
    let starBlank = `<img src="../src/image/rating/star_blank.svg">`;
    
    for(let i = 0; i < 5; i++) {
        if (i < rating) {
            result += star;
        } else {
            result += starBlank;
        }
    }

    return `<span class="rating-star-wrapper"> 
                ${result}
            </span>`;
}