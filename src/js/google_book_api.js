const apiKey = "AIzaSyClzHznnRNpujS7W1BlHNLRT2RMJmkRego";
const bookCountLimit = 6;
const apiUrl = "https://www.googleapis.com/books/v1/volumes";
const langRestrict = "en";
const placeHolderImage = "../src/image/place_holder_book_img.png";

export let currentStartIndex = 0;
export let currentBookList = [];

class Book {
    constructor(img, autorList, title, averageRating, ratingsCount, desctiption, price, id) {
        this.img = img; // ссылка на картинку
        this.autorList = autorList; // список авторов
        this.title = title; // название книги
        this.averageRating = averageRating; // рэйтинг от 1 до 5
        this.ratingsCount = ratingsCount; // количество поставивших рэйтинг
        this.description = desctiption; // описание
        this.price = price; // цена книги
        this.id = id; // id записи
    }
}

export async function getBookList(subject, startIndex) {
    currentStartIndex = startIndex;
    subject = subject != null ? subject : "Architecture"; // для загрузки при старте

    currentBookList = await fetch(`${apiUrl}?q=\"subject:${subject}\"&key=${apiKey}&printType=books&startIndex=${currentStartIndex}&maxResults=${bookCountLimit}&langRestrict=${langRestrict}`)
    .then(response => {
        console.log("response", response);
        return response.json();
    }).then(json => {
        console.log("json", json);
        return mappingBookDtoListToBookList(json.items);
    }).catch(() => {
        console.log("Не удалось получить список книг!");
    });
    return currentBookList;
}

function mappingBookDtoToBook(bookDto) {
    let volumeInfo = bookDto.volumeInfo;
    let amount = bookDto.saleInfo ? bookDto.saleInfo.retailPrice ? bookDto.saleInfo.retailPrice.amount : "" : "";
    let currencyCode = bookDto.saleInfo ? bookDto.saleInfo.retailPrice ? bookDto.saleInfo.retailPrice.currencyCode : "" : "";

    return new Book(
        volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : placeHolderImage,
        volumeInfo.authors,
        volumeInfo.title,
        volumeInfo.averageRating, 
        volumeInfo.ratingsCount, 
        volumeInfo.description,
        `${currencyCode} ${amount}`,
        bookDto.id
        );
}

function mappingBookDtoListToBookList(bookDtoList) {
    let resultList = [];

    bookDtoList.forEach(bookDto => {
        resultList.push(mappingBookDtoToBook(bookDto));
    });

    return resultList;
}