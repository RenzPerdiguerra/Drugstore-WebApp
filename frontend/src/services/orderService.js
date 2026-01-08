import callApi, { authApi, orderApi } from "../api/api.js"
import { hideModal } from "../utils/utility.js";

export function showSelectedOrdersSection() {
    $('.orders-sections .nav-item').on('click', function (e) {
        e.preventDefault();

        $('.orders-sections .nav-link').removeClass('active');

        $(this).find('.nav-link').addClass('active');

        const sectionName = $(this).data('section');

        $('.body-orders-list, .body-pending-confirmation, .body-confirmed-orders').addClass('d-none');

        if (sectionName === 'order-here') {
            $('.body-orders-list').removeClass('d-none');
            $('.orders-body-checked').removeClass('d-none');
            $('.body-pending-confirmation').addClass('d-none');
            $('.body-confirmed-orders').addClass('d-none');
        }

        if (sectionName === 'pending-confirmation') {
            $('.body-orders-list').addClass('d-none');
            $('.orders-body-checked').addClass('d-none');
            $('.body-pending-confirmation').removeClass('d-none');
        }

        if (sectionName === 'confirmed-orders') {
            $('.body-orders-list').addClass('d-none');
            $('.orders-body-checked').addClass('d-none');
            $('.body-confirmed-orders').removeClass('d-none');
        }
    });
}

// provides products for each checked rows
export function calculateSubTotal($row) {
    const qty = parseInt($row.find('.qty-input').val()) || 1;
    const rowCost = parseFloat($row.data('cost')) || 0;
    return qty * rowCost;
}

// Get qty input value to provide total cost per item and iterated over rendered items for the sum
export function calculateTotal() {
    $(document).on('input', '.qty-input', function(){
        const $row = $(this).closest('.selected-item');
        const rowTotal = calculateSubTotal($row);

        $row.find('.total-cost').text(`₱${rowTotal.toFixed(2)}`);

        let grandTotal = 0;
        $('.total-cost').each(function(){
            const val = parseFloat($(this).text().replace(/[^\d.-]/g, '')) || 0;
            grandTotal += val;
        });

        $('#orders-sum').html(`₱${grandTotal.toFixed(2)}`);
    })
}

// Extracts data from checked-items
export function collectCheckedItems() {
    let items = [];
    let grandTotal = 0;
    let counter = 0;

    $('.checked-items .selected-item').each(function(){
        const $row = $(this);
        const orderBatchesPayload = {
            order_id: $row.data('order_id'),
            category: $row.data('category'),
            g_name: $row.find('.col-md-4').text().trim(),
            b_name: $row.find('.col-md-3').first().text().trim(),
            cost: parseFloat($row.data('cost') || 0),
            qty: parseInt($row.find('.qty-input').val() || 1),
            total_cost: calculateSubTotal($row)
        };
    
        items.push(orderBatchesPayload);
        grandTotal += orderBatchesPayload.total_cost;
        counter += 1;
    });

    return { items, grandTotal, counter};
}

export function confirmOrdersSubmission() {
    $(document).on('click', '.confirmOrdersBtn', async function() {
        const $form = $('#ordersSubmitForm');
        const employeeName = $form.find('[name="name"]').val();
        // employeeId: form.find('emp_id'), To be included as Primary key if needed

        const {grandTotal, counter} = collectCheckedItems();
        const authResponse = await fetch(authApi.me, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth.jwt')},
                contentType: 'application/json'
                }
            );

        const empData = await authResponse.json();

        const payload = {
            // pb_id: DB default
            b_name: empData['username'],
            requester: employeeName, // should I use indexing even there is only a single kvp
            items_qty: counter,
            total_cost: grandTotal
            // created_at: DB default
            // modified_at: will vary depending on user modification
        };

        console.log("Pending batches payload:", payload);
        hideModal();
        
        callApi('POST', orderApi.createPendingBatch, JSON.stringify(payload))
        .fail(function(xhr, status, error) {
            console.error("API request failed:", status, error);
            alert('Failed to save update. Please try again.');
        })
        .done(function(response) {
            if (response) {
                alert('Update saved successfully!');
                location.reload();
            }
        });
    });
}

