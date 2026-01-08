// RESTful endpoints for listing, saving, updating, and deleting products
export const productApi = {
    list: 'http://127.0.0.1:5000/products/getProducts',
    save: 'http://127.0.0.1:5000/products/insertProduct',
    update: 'http://127.0.0.1:5000/products/updateProduct',
    remove: 'http://127.0.0.1:5000/products/deleteProduct'
};

export const orderApi = {
    list: 'http://127.0.0.1:5000/orders/get-order-list',
    save: 'http://127.0.0.1:5000/orders/insert-order-item',
    update: 'http://127.0.0.1:5000/orders/update-order-item',
    remove: 'http://127.0.0.1:5000/orders/delete-order-item',
    createPendingBatch: 'http://127.0.0.1:5000/orders/create-pending-batch',
    createConfirmedBatch: 'http://127.0.0.1:5000/orders/create-confirmed-batch'
};

export const authApi = {
    register: 'http://127.0.0.1:5000/auth/register',
    login: 'http://127.0.0.1:5000/auth/authenticate',
    me: 'http://127.0.0.1:5000/auth/me'
};

// Generic AJAX wrapper for sending JSON requests to the backend
export default function callApi(method, url, data = null, headers = {}) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json',
        headers
    });
};