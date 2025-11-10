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

$(function() {
    $.get(orderApi.list, function (response) {
        if (response && Array.isArray(response)) {
            var table = '';
            $.each(response, function (index, order) {
                table += '<tr data-id="' + order.order_id + 
                    '" data-category "' + order.category +
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
                        '<input class="form-check-input" type="checkbox" value="' + order.order_id + '" id="flexCheck_"' + index + '">' +
                        '<label class="form-check-label" for="flexCheck_"' + index + '"></label>' +
                    '</td>' +
                '</tr>'
            });
            $("#orders-body-table").find('tbody').empty().html(table);
        }
    })
});

// function will serve to collect all checked data
// generate a row level data to pass to order_batches
$(document).on('change', 'input.form-check-input', function(index) {
    const $tr = $(this).closest('tr');
    const requestPayload = {
        category: $tr.data('category'),
        g_name: $tr.data('gname'),
        b_name: $tr.data('bname'),
        uom : $tr.data('unit'),
        cost : $tr.data('cost')
    };

    var formHtml = `
        <div class="col col-md-3.5 d-flex justify-content-center">${requestPayload.g_name}</div>
        <div class="col col-md-3.5 d-flex justify-content-center">${requestPayload.b_name}</div>
        <div class="col col-md-2 d-flex justify-content-center">
            <input type="number" class="form-control qty-input" min="1" value="1" style="width: 30px;">
        </div>
        <div class="col col-md-3 d-flex justify-content-center">${requestPayload.cost}</div>
    `;

    $("div").find("#checked-rows").empty().html(formHtml);
});

$(document).on('input', '.qty-input', function(){
    const qty = $(this).val();
    const cost = $(this).closest('.row');
})
