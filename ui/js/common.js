// reusable APIs

export const productApi = {
  list: 'http://127.0.0.1:5000/getProducts',
  save: 'http://127.0.0.1:5000/insertProduct',
  remove: 'http://127.0.0.1:5000/deleteProduct'
};

// manage-product.js methods
export default function callApi(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
    })
}

export function createJSONRequest() {
    var data = $('#productForm').serializeArray();
    var requestPayload = {
        category: null,
        g_name: null,
        b_name: null,
        d_arrived: null,
        d_exp: null,
        cost: parseFloat($('#cost').val()) ,
        price: parseFloat($('#price').val()),
        stock: parseInt($('#stock').val(), 10),
        stock_status: null
    };
    
    $.each(data, function(index, field) {
        requestPayload[field.name] = field.value;
    })

    return requestPayload
}

export function showModal(formHtml) {
    $('#modalContent').html(formHtml);
    $('#modalOverlay').removeClass('hidden');
}

export function hideModal() {
    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
}

export function escapeHtml(str) {
return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatDateISO(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10);
}

export function formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
}

export function formatToRFC1123(isoDateStr) {
    const date = new Date(isoDateStr);
    return date.toUTCString();
}
