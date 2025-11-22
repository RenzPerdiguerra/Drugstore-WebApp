// RESTful endpoints for listing, saving, updating, and deleting products
export const productApi = {
    list: 'http://127.0.0.1:5000/getProducts',
    save: 'http://127.0.0.1:5000/insertProduct',
    update: 'http://127.0.0.1:5000/updateProduct',
    remove: 'http://127.0.0.1:5000/deleteProduct'
};

export const orderApi = {
    list: 'http://127.0.0.1:5000/getOrderList',
    save: 'http://127.0.0.1:5000/insertOrderItem',
    update: 'http://127.0.0.1:5000/updateOrderItem',
    remove: 'http://127.0.0.1:5000/deleteOrderItem'
};

// Generic AJAX wrapper for sending JSON requests to the backend
export default function callApi(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
    })
};