
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productRemoveApiUrl = 'http://127.0.0.1:5000/deleteProduct';

function callApi(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
    })
}

