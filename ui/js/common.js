
var productsListApiUrl = 'http://127.0.0.1:5000/getProducts';
var productsSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productsRemoveApiUrl = 'http://127.0.0.1:5000/deleteProduct';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}

