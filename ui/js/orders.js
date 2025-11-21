import callApi,
    {orderApi,
    createJSONRequest,
    showModal,
    hideModal,
    escapeHtml,
    formatDateISO,
    formatDateLong,
    productApi}
    from './common.js'

    // Renders order list
$(function() {
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
            $("#orders-body-table").find('tbody').empty().html(table);
        }
    });
});

// Generates row level data to pass to order_batches. Creates rows in ordering calculation column
$(document).on('change', 'input.form-check-input', function() {
    const $tr = $(this).closest('tr');
    const requestPayload = {
        category: $tr.data('category'),
        g_name: $tr.data('gname'),
        b_name: $tr.data('bname'),
        uom : $tr.data('unit'),
        cost : $tr.data('cost')
    };
    const orderId = $tr.data('id')

    // Appends checked items and remove unchecked items
    if ($(this).is(':checked')) {
        var formHtml = `
            <div class="d-flex m-1 selected-item" data-id="${orderId}" data-cost="${requestPayload.cost}">
                <div class="col col-md-4 d-flex justify-content-center">${requestPayload.g_name}</div>
                <div class="col col-md-3 d-flex justify-content-center">${requestPayload.b_name}</div>
                <!--Input Box for Qty of items required-->
                <div class="col col-md-2 d-flex justify-content-center">
                    <input type="number" class="form-control qty-input" min="1" value="1" style="width: 70px;">
                </div>
                <!--Placeholder for Total Cost-->
                <div class="col col-md-3 d-flex justify-content-center total-cost">${requestPayload.cost}</div>
            </div>
        `;
        $(".checked-items").append(formHtml);
    } else {
        $(`.selected-item[data-id="${orderId}"]`).remove();
    }

    let sum = 0;

    $('.total-cost').each(function(){
        const val = parseFloat($(this).text().replace(/[^\d.-]/g, '') || 0);
        sum += val;
    });

    $('#orders-sum').html(`₱${sum.toFixed(2)}`);
});


// Get qty input value to provide total cost per item and iterated over rendered items for the sum
$(document).on('input', '.qty-input', function(){
    const qty = parseInt($(this).val()) || 1;
    const $row = $(this).closest('.selected-item');
    const rowCost = parseFloat($row.data('cost')) || 0;
    
    var totalCost = qty * rowCost;

    $row.find('.total-cost').text(`₱${totalCost.toFixed(2)}`);

    let sum = 0;
    $('.total-cost').each(function(){
        const val = parseFloat($(this).text().replace(/[^\d.-]/g, '')) || 0;
        sum += val;
    });

    $('#orders-sum').html(`₱${sum.toFixed(2)}`);
});

