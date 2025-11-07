// RESTful endpoints for listing, saving, updating, and deleting products
export const productApi = {
    list: 'http://127.0.0.1:5000/getProducts',
    save: 'http://127.0.0.1:5000/insertProduct',
    update: 'http://127.0.0.1:5000/updateProduct',
    remove: 'http://127.0.0.1:5000/deleteProduct'
};

export const orderApi = {
    list: 'http://127.0.0.1:5000/getOrders',
    save: 'http://127.0.0.1:5000/insertOrder',
    update: 'http://127.0.0.1:5000/updateOrder',
    remove: 'http://127.0.0.1:5000/deleteOrder'
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

// Creates request payload with form inputs and edit button data-id. Used parameters for field extensions
export function createJSONRequest(formSelector, extraFields = {}) {
    // creates an object for insert and edit button form values
    const form = $(formSelector);
    const data = {
        category: form.find('[name="category"]').val(),
        g_name: form.find('[name="g_name"]').val(),
        b_name: form.find('[name="b_name"]').val(),
        d_arrived: form.find('[name="d_arrived"]').val(),
        d_exp: form.find('[name="d_exp"]').val(),
        cost: form.find('[name="cost"]').val(),
        price: form.find('[name="price"]').val(),
        stock: form.find('[name="stock"]').val(),
        stock_status: form.find('[name="stock_status"]').val()
  };

    return { ...data, ...extraFields }; // returns a merged object
};

// Shows intended form
export function showModal(formHtml) {
    $('#modalContent').html(formHtml);
    $('#modalOverlay').removeClass('hidden');
};

// Hides intended form
export function hideModal() {
    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
};

// Provides alternative str for form inputs with blanks or special chars
export function escapeHtml(str) {
return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

// Formats date to 'YYYY-MM-DD'
export function formatDateISO(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10);
};

// Formats date to 'Month Day, YYYY'
export function formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
};

// Formats date to UTC
export function formatToRFC1123(isoDateStr) {
    const date = new Date(isoDateStr);
    return date.toUTCString();
};
