import * as googleApiClient from "./google_book_api.js";
import * as orderRepository from "./order_repository.js";
import {addBooksInView, setCountItemToIconCart} from "./view_handler.js";

const btnLoadMore = document.querySelector(".card-btn");
const activeCatigory = document.querySelector(".active");


btnLoadMore.addEventListener("click", async event => {
    event.preventDefault();
    
    const bookList = await googleApiClient.getBookList(activeCatigory.innerText, googleApiClient.currentStartIndex + 6);
    addBooksInView(bookList);
});

export function setEventListenerForBtnItemToCart() {
    const btnItemToCart = document.querySelectorAll(".item-to-cart-btn");
    
    btnItemToCart.forEach((item, index) => {
        item.addEventListener("click", event => {
            event.preventDefault();
    
            if (!item.classList.contains("item-in-cart")) {
                orderRepository.addItemToCart(googleApiClient.currentBookList[index]);
    
                item.innerHTML = "in the cart";
                item.classList.add("item-in-cart");
                
                setCountItemToIconCart(orderRepository.getItemFromCart().length);
            } else {
                orderRepository.deleteFromCart(googleApiClient.currentBookList[index]);
    
                item.innerHTML = "by now";
                item.classList.remove("item-in-cart");
    
                setCountItemToIconCart(orderRepository.getItemFromCart().length);
            }
            console.log(orderRepository.getItemFromCart());
        });
    });
}




