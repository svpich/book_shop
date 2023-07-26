import {addBooksInView} from "./view_handler.js";
import {getBookList} from "./google_book_api.js";

const categoryLinkList = document.querySelectorAll(".sidebar-wrapper__item");

categoryLinkList.forEach(link => {
    link.addEventListener("click", async event => {
        event.preventDefault();

        const bookList = await getBookList(event.target.innerText, 0);

        addBooksInView(bookList);
        
        switchActivItem(event.target);
    });
});


function switchActivItem(item) {
    
    categoryLinkList.forEach(category => {
        category.classList.remove("active");
    });
    item.classList.add("active");
}
