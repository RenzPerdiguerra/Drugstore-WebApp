import { orderApi } from "../api/api.js";
import { showModal, hideModal, formatToPhilippineTime} from "../utils/utility.js";

// Renders order list
export default function getOrderList() {
    $.get(orderApi.list, function (response) {
        if (response && Array.isArray(response)) {
            var table = '';
            $.each(response, function (index, order) {
                table += '<tr data-id="' + order.order_id + 
                    '" data-category= "' + order.category +
                    '" data-gname="' + order.g_name +
                    '" data-bname="' + order.b_name +
                    '" data-unit="' + order.uom +
                    '" data-cost="' + order.cost + '">' +
                    '<td>' + order.order_id + '</td>' +
                    '<td>' + order.category + '</td>' +
                    '<td>' + order.g_name + '</td>' +
                    '<td>' + order.b_name + '</td>' +
                    '<td>' + order.uom + '</td>' +
                    '<td>' + order.cost + '</td>' +
                    '<td>' + 
                        '<input class="form-check-input" type="checkbox" value="' + order.order_id + '" id="flexCheck_' + index + '">' +
                        '<label class="form-check-label" for="flexCheck_"' + index + '"></label>' +
                    '</td>' +
                '</tr>'
            });
            $(".body-orders-list").find('tbody').empty().html(table);
        }
    });
}

// Render data on calculation table. Generates payload for order batches. Creates rows in calculation column
export function renderCheckedItems() {
    $(document).on('change', 'input.form-check-input', function() {
        const $tr = $(this).closest('tr');
        const requestPayload = {
            category: $tr.data('category'),
            g_name: $tr.data('gname'),
            b_name: $tr.data('bname'),
            unit: $tr.data('unit'),
            uom : $tr.data('unit'),
            cost : $tr.data('cost')
        };
        const orderId = $tr.data('id')

        // Appends checked items and remove unchecked items
        if ($(this).is(':checked')) {
            var formHtml = `
                <div class="d-flex justify-content-center m-1 selected-item" data-id="${orderId}" data-category="${requestPayload.category}"
                    data-cost="${requestPayload.cost}" data-unit="${requestPayload.unit}">
                    <div class="col col-md-3 d-flex justify-content-center">${requestPayload.g_name}</div>
                    <div class="col col-md-3 d-flex justify-content-center">${requestPayload.b_name}</div>
                    <div class="col col-md-2 d-flex justify-content-center">${requestPayload.unit}</div>
                    <!--Input Box for Qty of items required-->
                    <div class="col col-md-2 d-flex justify-content-center">
                        <input type="number" class="form-control qty-input" min="1" value="1" style="width: 70px;">
                    </div>
                    <!--Placeholder for Total Cost-->
                    <div class="col col-md-2 d-flex justify-content-center total-cost">${requestPayload.cost}</div>
                </div>
            `;
            $(".checked-items").append(formHtml);
        } else {
            $(`.selected-item[data-id="${orderId}"]`).remove();
        }

        // calculate total from each row subtotal
        let sum = 0;
        $('.total-cost').each(function(){
            const val = parseFloat($(this).text().replace(/[^\d.-]/g, '') || 0);
            sum += val;
        });

        $('#orders-sum').html(`₱${sum.toFixed(2)}`);
    })
}

// Creates a blank form requiring name of the employee ordering
export function renderSubmitForm () {
    $('.orders-final .submit').on('click', function() {
        const formHtml = `
            <form id="orders-submit-form">
                <div class="d-flex justify-content-center">Confirm Submission</div>

                <div class="form-row m-1">
                    <label>Name: </label>
                    <select name="name" required>
                        <option value="">-- Select Name --</option>
                        <option value="Mary Joy Ramos">Mary Joy Ramos</option>
                        <option value="Kenneth Duclayan">Kenneth Duclayan</option>
                        <option value="Judith Maycacayan">Judith Maycacayan</option>
                        <option value="She Romano">She Romano</option>
                        <option value="Elreen Umipig">Elreen Umipig</option>
                        <option value="Roanne Melissa Tiongson">Roanne Melissa Tiongson</option>
                        <option value="Renz Ian Perdiguerra">Renz Ian Perdiguerra</option>
                        <option value="Rommel John Perdiguerra">Rommel John Perdiguerra</option>
                        <option value="Claudine Monet Perdiguerra">Claudine Monet Perdiguerra</option>
                    </select>
                </div>
                
                <button type="button" class="confirm-orders-btn m-1">Confirm</button>
                <button type="button" class="cancel-orders-btn m-1">Cancel</button>
            </form>
        `;
        showModal(formHtml);
    });

    $('#modalOverlay').on('click', '.cancel-orders-btn', function() {
        hideModal();
    });
}

// Renders pending batches list
export function getPendingBatches() {
    $.get(orderApi.pendingBatchesList, function (response) {
        if (response && Array.isArray(response)) {
            var table = '';
            $.each(response, function (index, order) {
                table += '<tr data-id="' + order.pb_id + 
                    '" data-b-name= "' + order.branch_name +
                    '" data-requester="' + order.requester +
                    '" data-items-qty="' + order.items_qty +
                    '" data-total-cost="' + order.total_cost +
                    '" data-created-at="' + order.created_at +
                    '" data-modified-at="' + order.modified_at + '">' +
                    '<td>' + 
                        '<span class="me-2">' + order.pb_id + '</span>' +
                        '<button class="btn btn-sm btn-link dropdown-toggle" id="pb-caret-btn">' +
                    '</td>' +
                    '<td>' + order.branch_name + '</td>' +
                    '<td>' + order.requester + '</td>' +
                    '<td>' + order.items_qty + '</td>' +
                    '<td>' + order.total_cost + '</td>' +
                    '<td>' + formatToPhilippineTime(order.created_at) + '</td>' +
                    '<td>' + formatToPhilippineTime(order.modified_at) + '</td>' +
                    '<td>' + 
                         // mark each row with their id for edit btn row data navigation
                        '<div class="d-flex justify-content-center">' +
                        '<button class="btn btn-success btn-sm edit-btn me-1" id="pb-confirm-btn" data-id="' + order.pb_id + '">Confirm</button> ' +
                        '<button class="btn btn-primary btn-sm" id="pb-edit-btn" data-id="' + order.pb_id + '">Edit</button>' +
                        '</div>' +
                    '</td>' +
                '</tr>'
            });
            $(".body-pending-confirmation").find('tbody').empty().html(table);
        }
    });
}

// * Add event to get pb_id, 2 divs for header and table, quantity always editable, add remove action
export function renderPendingBatchesItemsForm() {
    const formHtml = `
        <form id="">
            <div>
            </div>
            <div>
                table += '<tr data-id="' + order.order_id + 
                    '" data-category= "' + order.category +
                    '" data-gname="' + order.g_name +
                    '" data-bname="' + order.branch_name +
                    '" data-unit="' + order.uom +
                    '" data-cost="' + order.cost + '">' +
                    '<td>' + order.order_id + '</td>' +
                    '<td>' + order.category + '</td>' +
                    '<td>' + order.g_name + '</td>' +
                    '<td>' + order.b_name + '</td>' +
                    '<td>' + order.uom + '</td>' +
                    '<td>' + order.cost + '</td>' +
                    '<td>' + 
                        '<input class="form-check-input" type="checkbox" value="' + order.order_id + '" id="flexCheck_' + index + '">' +
                        '<label class="form-check-label" for="flexCheck_"' + index + '"></label>' +
                    '</td>' +
                '</tr>'
            </div>
        </form>
    `
}

// Renders confirmed batches list
export function getConfirmedBatches() {
    if ($().on('click', function() {
        $.show();
    })) 
    
    $.get(orderApi.confirmedBatchesList, function (response) {
        if (response && Array.isArray(response)) {
            var table = '';
            $.each(response, function (index, order) {
                table += '<tr data-id="' + order.cb_id +
                    '" data-pb-id="' + order.pb_id +
                    '" data-b-name= "' + order.branch_name +
                    '" data-requester="' + order.requester +
                    '" data-items-qty="' + order.items_qty +
                    '" data-total-cost="' + order.total_cost +
                    '" data-confirmed-at="' + order.confirmed_at + '">' +
                    '<td>' + order.cb_id + '</td>' +
                    '<td>' + order.pb_id + '</td>' +
                    '<td>' + order.branch_name + '</td>' +
                    '<td>' + order.requester + '</td>' +
                    '<td>' + order.items_qty + '</td>' +
                    '<td>' + order.total_cost + '</td>' +
                    '<td>' + formatToPhilippineTime(order.confirmed_at) + '</td>' +
                    '<td>' + 
                         // mark each row with their id for edit btn row data navigation
                        '<button class="btn btn-danger btn-sm edit-btn" id="cb-export-btn" data-id="' + order.cb_id + '">Export</button> ' +
                    '</td>' +
                '</tr>'
            });
            $(".body-confirmed-batches").find('tbody').empty().html(table);
        }
    });
}