let order = [];

export function addItemToCart(item) {
    order.push(item);
    sessionStorage.setItem("cart", JSON.stringify(order));
}

export function getItemFromCart() {
    let obj = JSON.parse(sessionStorage.getItem("cart"));
    return obj;
}

export function deleteFromCart(item) {
    let obj = JSON.parse(sessionStorage.getItem("cart"));
    order = obj.filter(orderItem => {
        return orderItem.id !== item.id;
    });
    sessionStorage.setItem("cart", JSON.stringify(order));
}