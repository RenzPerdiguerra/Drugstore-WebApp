import callApi, { authApi, orderApi } from "../api/api.js"
import { hideModal } from "../utils/utility.js";

// Allows selection of panel from navbar
export function showSelectedOrdersSection() {
    $('.orders-sections .nav-item').on('click', function (e) {
        e.preventDefault();

        $('.orders-sections .nav-link').removeClass('active');

        $(this).find('.nav-link').addClass('active');

        const sectionName = $(this).data('section');

        $('.body-orders-list, .body-pending-confirmation, .body-confirmed-batches').addClass('d-none');

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
            $('.body-confirmed-batches').removeClass('d-none');
        }
    });
}

// provides subtotal for each checked rows
export function calculateSubTotal($row) {
    const qty = parseInt($row.find('.qty-input').val()) || 1;
    const rowCost = parseFloat($row.data('cost')) || 0;
    return qty * rowCost;
}

// Get qty input value to provide total cost per item and iterate over rendered items for the sum
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
        const costPerOrder = calculateSubTotal($row);
        const orderBatchesPayload = {
            category: $row.data('category'),
            g_name: $row.find('.col-md-4').text().trim(),
            b_name: $row.find('.col-md-3').first().text().trim(),
            unit: $row.find('.col-md-1').text().trim(),
            cost: parseFloat($row.data('cost') || 0),
            items_qty: parseInt($row.find('.qty-input').val() || 1),
            total_cost: costPerOrder
        };

        items.push(orderBatchesPayload);
        grandTotal += costPerOrder;
        counter += 1;
    });

    return { items, grandTotal, counter};
}

// Get username from authorization token. Create order and pending batches
export function confirmOrdersSubmission() {
    $(document).on('click', '.confirm-orders-btn', async function() {
        const $form = $('#orders-submit-form');
        const employeeName = $form.find('[name="name"]').val();

        const {items, grandTotal, counter} = collectCheckedItems();
        const authResponse = await fetch(authApi.me, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth.jwt')},
                contentType: 'application/json'
                }
            );

        const empData = await authResponse.json();

        const orderBatchPayload = items.map(item => ({
            branch_name: empData['username'],
            requester: employeeName,
            ...item
        }));

        await fetch(orderApi.createOrderBatch, {
            method: 'POST',
            headers: {
                contentType : 'application/json'
            },
            body: JSON.stringify(items)
        });

        const pendingBatchPayload = {
            branch_name: empData['username'],
            requester: employeeName,
            items_qty: counter,
            total_cost: grandTotal
        };

        console.log("Order batches payload: ", orderBatchPayload);
        console.log("Pending batches payload: ", pendingBatchPayload);
        hideModal();
        
        callApi('POST', orderApi.createPendingBatch, JSON.stringify(pendingBatchPayload))
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

// Gets auth, filter role and create confirmed batch
export function confirmPendingBatch() {
    $(document).on('click', '#pb-confirm-btn', async function(){
        const authResponse = await fetch(authApi.me, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth.jwt')},
                contentType: 'application/json'
                }
            );
        
        const userData = await authResponse.json();

        if (userData['role'] != 'admin') {
            alert('Confirmation available for management only. Please contact respective manager.')
            return;
        }

        confirm("Are you sure you want to confirm this pending batch?");
        const payload = $(this).data('id');

        callApi('POST', orderApi.createConfirmedBatch, JSON.stringify(payload))
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

// Renders edit form of order batch from selected pending batch
export function editPendingBatchItems() {
    $(document).on('click', '#pb-caret-btn', function () {
        showModal(formHtml);
    });
}

// Reads confirmed batch row and allows user to download csv file
export function exportOrderBatchCsv() {
    $(document).on('click', '#cb-export-btn', async function() {
        const authResponse = await fetch(authApi.me, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth.jwt')},
                contentType: 'application/json'
                }
            );
        
        const userData = await authResponse.json();

        if (userData['role'] != 'admin') {
            alert('Confirmation available for management only. Please contact respective manager.')
            return;
        }

        const batchId = {
            cb_id: $(this).data('id')
        };

        try {
            const res = await fetch(orderApi.exportBatch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(batchId)
            })
            if (!res.ok) {
                throw new Error('Failed to fetch batch data');
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'confirmed_batch.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to export batch. Please try again.');
        }
    });
}