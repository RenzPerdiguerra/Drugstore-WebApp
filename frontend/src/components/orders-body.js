import callApi,
    {orderApi,
    createJSONRequest,
    showModal,
    hideModal,
    escapeHtml,
    formatDateISO,
    formatDateLong,
    productApi}
    from '../services/orderService.js'



// Submitted orders are collected inside a table shown in DB but not in UI
// Submission will also create a row for pending_batches (shown in UI)

// DOM manipulate orders-body and create a tab wherein details of the orders are shown
// Place two buttons at the end (COnfirm - Green, Cancel - Red)