// RESTful endpoints for listing, saving, updating, and deleting products
export const productApi = {
    list: 'http://127.0.0.1:5000/products/getProducts',
    save: 'http://127.0.0.1:5000/products/insertProduct',
    update: 'http://127.0.0.1:5000/products/updateProduct',
    remove: 'http://127.0.0.1:5000/products/deleteProduct'
};

export const orderApi = {
    list: 'http://127.0.0.1:5000/orders/getOrderList',
    save: 'http://127.0.0.1:5000/orders/insertOrderItem',
    update: 'http://127.0.0.1:5000/orders/updateOrderItem',
    remove: 'http://127.0.0.1:5000/orders/deleteOrderItem'
};

export const authApi = {
    register: 'http://127.0.0.1:5000/auth/register',
    login: 'http://127.0.0.1:5000/auth/authenticate'
};

// Generic AJAX wrapper for sending JSON requests to the backend
export default function callApi(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
    });
};