// reusable APIs
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productRemoveApiUrl = 'http://127.0.0.1:5000/deleteProduct';

// manage-product.js methods
function callApi(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
    })
}

function showModal(formHtml) {
    $('#modalContent').html(formHtml);
    $('#modalOverlay').removeClass('hidden');
}

function hideModal() {
    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
}

function escapeHtml(str) {
return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatDateISO(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10);
}

function formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
}

function formatToRFC1123(isoDateStr) {
    const date = new Date(isoDateStr);
    return date.toUTCString();
}

