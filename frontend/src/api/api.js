// RESTful endpoints for listing, saving, updating, and deleting products
const IS_PROD = window.location.hostname !== 'localhost' &&
                window.location.hostname !== '127.0.0.1'

const BASE_URL = IS_PROD
    ? 'https://drugstore-webapp.onrender.com'
    : 'http://127.0.0.1:5000'

export const productApi = {
    list:   `${BASE_URL}/products/getProducts`,
    save:   `${BASE_URL}/products/insertProduct`,
    update: `${BASE_URL}/products/updateProduct`,
    remove: `${BASE_URL}/products/deleteProduct`
}

export const orderApi = {
    list:                 `${BASE_URL}/orders/get-order-list`,
    save:                 `${BASE_URL}/orders/insert-order-item`,
    update:               `${BASE_URL}/orders/update-order-item`,
    remove:               `${BASE_URL}/orders/delete-order-item`,
    pendingBatchesList:   `${BASE_URL}/orders/get-pending-batches-list`,
    confirmedBatchesList: `${BASE_URL}/orders/get-confirmed-batches-list`,
    createOrderBatch:     `${BASE_URL}/orders/create-order-batch`,
    createPendingBatch:   `${BASE_URL}/orders/create-pending-batch`,
    createConfirmedBatch: `${BASE_URL}/orders/create-confirmed-batch`,
    exportBatch:          `${BASE_URL}/orders/export`
}

export const authApi = {
    register: `${BASE_URL}/auth/register`,
    login:    `${BASE_URL}/auth/authenticate`,
    me:       `${BASE_URL}/auth/me`
}

// ── Generic AJAX Wrapper ──────────────────────────────────────────────────
export default function callApi(method, url, data = null, headers = {}) {
    return $.ajax({
        method,
        url,
        data,
        contentType: 'application/json',
        dataType: 'json', // verify what services require json, remove dataType if unnecessary
        headers
    })
}

